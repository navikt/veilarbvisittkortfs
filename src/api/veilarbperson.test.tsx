import { cleanup, renderHook, waitFor } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { graphql, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';
import { PersonaliaGraphqlRequest, usePersonalia, useVisittkortEtiketter, VisittkortEtiketter } from './veilarbperson';
import { behandlingsnummer } from './behandlingsnummer';
import { logGraphQLError } from './ao-oppfolgingskontor';
import { mockPersonalia, mockVisittkortEtiketter, veilarbpersonHandlers } from '../mock/api/veilarbperson';
import { HttpError } from './httpUtils';

vi.mock('./ao-oppfolgingskontor', () => ({ logGraphQLError: vi.fn() }));
vi.mock('../mock/config', () => ({ defaultNetworkResponseDelay: 0 }));

const brukerFnr = '10108000398';

const server = setupServer(...veilarbpersonHandlers);
const personGraphql = graphql.link('/veilarbperson/graphql');

const SwrWrapper = ({ children }: PropsWithChildren) => (
    <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>{children}</SWRConfig>
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => {
    cleanup();
    server.resetHandlers();
    vi.clearAllMocks();
});
afterAll(() => server.close());

describe('usePersonalia', () => {
    test('henter personalia uten det gamle etikettfeltet', async () => {
        let requestBody: PersonaliaGraphqlRequest | undefined;
        server.use(
            http.post<never, PersonaliaGraphqlRequest>('/veilarbperson/graphql', async ({ request }) => {
                requestBody = await request.json();
                return HttpResponse.json({ data: { person: mockPersonalia }, errors: null });
            })
        );

        const { result } = renderHook(() => usePersonalia(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.personalia).toEqual(mockPersonalia));
        expect(requestBody?.query).not.toMatch(/\betiketter\b/);
        expect(requestBody?.variables).toEqual({ fnr: brukerFnr, behandlingsnummer });
    });

    test('returnerer feil ved GraphQL-feil', async () => {
        const response = { data: { person: null }, errors: [{ message: 'Testfeil' }] };
        server.use(http.post('/veilarbperson/graphql', () => HttpResponse.json(response)));

        const { result } = renderHook(() => usePersonalia(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.error).toEqual(new Error('Feil ved henting av personalia')));
        expect(result.current.personalia).toBeUndefined();
        expect(logGraphQLError).toHaveBeenCalledWith(response);
    });
});

describe('useVisittkortEtiketter', () => {
    test('henter alle 22 felt i ett navngitt GraphQL-kall', async () => {
        let requestBody: PersonaliaGraphqlRequest | undefined;
        server.use(
            http.post<never, PersonaliaGraphqlRequest>('/veilarbperson/graphql', async ({ request }) => {
                requestBody = await request.json();
                expect(new URL(request.url).pathname).toBe('/veilarbperson/graphql');
                return HttpResponse.json({ data: { visittkortEtiketter: mockVisittkortEtiketter } });
            })
        );

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.etiketter).toEqual(mockVisittkortEtiketter));
        expect(requestBody?.variables).toEqual({ fnr: brukerFnr, behandlingsnummer });
        expect(requestBody?.query).toMatch(/query HentVisittkortEtiketter\b/);
        expect(requestBody?.query).toMatch(/sikkerhetstiltak\s*\{\s*etikett\s+beskrivelse\s*\}/);
        const felt = requestBody?.query
            .match(/visittkortEtiketter\([^)]*\)\s*\{([\s\S]*)\}/)?.[1]
            .replace(/sikkerhetstiltak\s*\{[^}]*\}/, 'sikkerhetstiltak')
            .replace(/[{}]/g, '')
            .trim()
            .split(/\s+/);

        expect(felt).toEqual([
            'dod',
            'diskresjonskode',
            'utmeldingskandidat',
            'sikkerhetstiltak',
            'skjerming',
            'vergemaalOppfolging',
            'fullmaktOppfolging',
            'tegnspraaktolk',
            'talespraaktolk',
            'kvp',
            'manuellOppfolging',
            'reservertKrr',
            'utdatertIKrr',
            'ikkeUnderOppfolging',
            'varsel',
            'ikkeRegistrertKrr',
            'trengerOppfolgingsvedtak',
            'sykmeldt',
            'iArbeidssokerregisteret',
            'antattGodeMuligheter',
            'antattBehovForVeiledning',
            'oppgittHindringer'
        ]);
        expect(Object.keys(mockVisittkortEtiketter)).toHaveLength(22);
    });

    test('beholder ukjentverdier uten å tolke dem som positive eller negative etiketter', async () => {
        const etiketter: VisittkortEtiketter = {
            ...mockVisittkortEtiketter,
            dod: 'UKJENT_PERSONALIA',
            sikkerhetstiltak: { etikett: 'UKJENT_SIKKERHETSTILTAK', beskrivelse: null },
            vergemaalOppfolging: 'UKJENT_REPRESENTASJON',
            talespraaktolk: 'UKJENT_TOLKEBEHOV',
            kvp: 'UKJENT_OPPFOLGING',
            reservertKrr: 'UKJENT_KRR',
            varsel: 'UKJENT_VARSEL',
            trengerOppfolgingsvedtak: 'UKJENT_OPPFOLGINGSVEDTAK',
            iArbeidssokerregisteret: 'UKJENT_ARBEIDSSOKERREGISTER',
            oppgittHindringer: 'UKJENT_PROFILERING'
        };
        server.use(
            personGraphql.query('HentVisittkortEtiketter', () =>
                HttpResponse.json({ data: { visittkortEtiketter: etiketter } })
            )
        );

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.etiketter).toEqual(etiketter));
        expect(result.current.error).toBeUndefined();
    });

    test.each([undefined, null, []])('godtar en vellykket respons med errors=%j', async errors => {
        server.use(
            personGraphql.query('HentVisittkortEtiketter', () =>
                HttpResponse.json({ data: { visittkortEtiketter: mockVisittkortEtiketter }, errors })
            )
        );

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.etiketter).toEqual(mockVisittkortEtiketter));
        expect(result.current.error).toBeUndefined();
    });

    test('returnerer feil ved GraphQL-feil over HTTP 200 uten å logge responsen', async () => {
        server.use(
            personGraphql.query('HentVisittkortEtiketter', () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: null },
                    errors: [{ message: 'KILDE_IKKE_KONFIGURERT', extensions: { code: 'KILDE_IKKE_KONFIGURERT' } }]
                })
            )
        );

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.error).toEqual(new Error('Feil ved henting av visittkortetiketter')));
        expect(result.current.etiketter).toBeUndefined();
        expect(logGraphQLError).not.toHaveBeenCalled();
    });

    test.each([
        null,
        {},
        { data: null },
        { data: {} },
        { data: { visittkortEtiketter: null } },
        { data: { visittkortEtiketter: 'ugyldig' } },
        { data: { visittkortEtiketter: [] } }
    ])('returnerer feil ved ugyldig rotrespons: %j', async response => {
        server.use(personGraphql.query('HentVisittkortEtiketter', () => HttpResponse.json(response)));

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.error).toEqual(new Error('Feil ved henting av visittkortetiketter')));
        expect(result.current.etiketter).toBeUndefined();
    });

    test.each([401, 403, 500])('returnerer HTTP-feil med status %s', async status => {
        server.use(personGraphql.query('HentVisittkortEtiketter', () => new HttpResponse(null, { status })));

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.error).toBeInstanceOf(HttpError));
        expect(result.current.etiketter).toBeUndefined();
    });

    test('returnerer nettverksfeil', async () => {
        server.use(personGraphql.query('HentVisittkortEtiketter', () => HttpResponse.error()));

        const { result } = renderHook(() => useVisittkortEtiketter(brukerFnr), { wrapper: SwrWrapper });

        await waitFor(() => expect(result.current.error).toBeInstanceOf(Error));
        expect(result.current.etiketter).toBeUndefined();
    });

    test('holder etiketter og personalia adskilt i cache og mock', async () => {
        const { result } = renderHook(
            () => ({ personalia: usePersonalia(brukerFnr), etiketter: useVisittkortEtiketter(brukerFnr) }),
            { wrapper: SwrWrapper }
        );

        await waitFor(() => {
            expect(result.current.personalia.personalia).toEqual(mockPersonalia);
            expect(result.current.etiketter.etiketter).toEqual(mockVisittkortEtiketter);
        });
    });

    test('sender ikke etikettkallet uten valgt bruker', () => {
        const handler = vi.fn();
        server.use(
            personGraphql.query('HentVisittkortEtiketter', () => {
                handler();
                return HttpResponse.json({ data: { visittkortEtiketter: mockVisittkortEtiketter } });
            })
        );

        const { result } = renderHook(() => useVisittkortEtiketter(undefined), { wrapper: SwrWrapper });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.etiketter).toBeUndefined();
        expect(result.current.error).toBeUndefined();
        expect(handler).not.toHaveBeenCalled();
    });

    test('henter nye etiketter ved brukerbytte uten å gjenbruke forrige brukers resultat', async () => {
        const annenBrukerFnr = '10108000399';
        const forespurteBrukere: string[] = [];
        server.use(
            personGraphql.query<{ visittkortEtiketter: VisittkortEtiketter }, PersonaliaGraphqlRequest['variables']>(
                'HentVisittkortEtiketter',
                ({ variables }) => {
                    forespurteBrukere.push(variables.fnr);
                    return HttpResponse.json({
                        data: {
                            visittkortEtiketter: {
                                ...mockVisittkortEtiketter,
                                kvp: variables.fnr === brukerFnr ? 'KVP' : null
                            }
                        }
                    });
                }
            )
        );
        const { result, rerender } = renderHook(({ fnr }) => useVisittkortEtiketter(fnr), {
            initialProps: { fnr: brukerFnr },
            wrapper: SwrWrapper
        });

        await waitFor(() => expect(result.current.etiketter?.kvp).toBe('KVP'));
        rerender({ fnr: annenBrukerFnr });
        expect(result.current.etiketter).toBeUndefined();
        await waitFor(() => expect(result.current.etiketter?.kvp).toBeNull());
        expect(forespurteBrukere).toEqual([brukerFnr, annenBrukerFnr]);
    });
});
