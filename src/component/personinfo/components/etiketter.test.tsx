import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, expect, test, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';
import { SWRConfig } from 'swr';
import Etiketter from './etiketter';
import { VisittkortEtiketter } from '../../../api/veilarbperson';
import { behandlingsnummer } from '../../../api/behandlingsnummer';
import { veilarbpersonHandlers } from '../../../mock/api/veilarbperson';

const brukerFnr = '10108000398';
const tommeEtiketter: VisittkortEtiketter = {
    dod: null,
    diskresjonskode: null,
    utmeldingskandidat: null,
    sikkerhetstiltak: null,
    skjerming: null,
    vergemaalOppfolging: null,
    fullmaktOppfolging: null,
    tegnspraaktolk: null,
    talespraaktolk: null,
    kvp: null,
    manuellOppfolging: null,
    reservertKrr: null,
    utdatertIKrr: null,
    ikkeUnderOppfolging: null,
    varsel: null,
    ikkeRegistrertKrr: null,
    trengerOppfolgingsvedtak: null,
    sykmeldt: null,
    iArbeidssokerregisteret: null,
    antattGodeMuligheter: null,
    antattBehovForVeiledning: null,
    oppgittHindringer: null
};

const server = setupServer();
const renderEtiketter = () =>
    render(
        <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>
            <Etiketter brukerFnr={brukerFnr} />
        </SWRConfig>
    );

describe('Etiketter', () => {
    beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
    afterEach(() => {
        cleanup();
        server.resetHandlers();
    });
    afterAll(() => server.close());

    test('henter etiketter med ett GraphQL-kall og viser markeringene fra backend', async () => {
        const mottattRequest = vi.fn();
        server.use(
            http.post('/veilarbperson/graphql', async ({ request }) => {
                mottattRequest(await request.json(), request.credentials);
                return HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            vergemaalOppfolging: 'VERGEMAAL_OPPFOLGING',
                            diskresjonskode: '7',
                            sikkerhetstiltak: { etikett: 'Ansatte i samtale', beskrivelse: 'To ansatte i samtale' },
                            utmeldingskandidat: 'FORLENGELSE_UTLOPT',
                            trengerOppfolgingsvedtak: 'TRENGER_OPPFOLGINGSVEDTAK'
                        }
                    }
                });
            })
        );

        renderEtiketter();

        expect(await screen.findByText('Vergemål')).toBeTruthy();
        expect(screen.getByText('Kode 7')).toBeTruthy();
        expect(screen.getByText('Ansatte i samtale').getAttribute('title')).toBe('To ansatte i samtale');
        expect(screen.getByText('Forlengelse utløpt')).toBeTruthy();
        expect(screen.getByText('Trenger oppfølgingsvedtak § 14 a')).toBeTruthy();
        expect(screen.queryByText('Ikke under oppfølging')).toBeNull();
        expect(mottattRequest).toHaveBeenCalledExactlyOnceWith(
            {
                query: expect.stringContaining('query VisittkortEtiketter'),
                variables: { fnr: brukerFnr, behandlingsnummer }
            },
            'include'
        );
    });

    test('utviklingsmocken skiller etikettspørringen fra personalia', async () => {
        server.use(...veilarbpersonHandlers);

        renderEtiketter();

        expect(await screen.findByText('Vergemål')).toBeTruthy();
        expect(screen.getByText('I Arbeidssøkerregisteret')).toBeTruthy();
        expect(screen.getByText('Oppgitt hindringer')).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
    });

    test('viser lastestatus og deretter ingen etiketter når alle feltene er null', async () => {
        server.use(
            http.post('/veilarbperson/graphql', async () => {
                await delay(20);
                return HttpResponse.json({ data: { visittkortEtiketter: tommeEtiketter } });
            })
        );

        const { container } = renderEtiketter();

        expect(screen.getByTitle('Laster etiketter')).toBeTruthy();
        await waitFor(() => expect(screen.queryByTitle('Laster etiketter')).toBeNull());
        expect(container.textContent).toBe('');
        expect(screen.queryByRole('alert')).toBeNull();
    });

    test.each(['dod', 'diskresjonskode', 'sikkerhetstiltak', 'skjerming'])(
        'viser alvorlig feil ved feil i %s, beholder vellykkede etiketter og prioriterer over mindre alvorlige feil',
        async felt => {
            server.use(
                http.post('/veilarbperson/graphql', () =>
                    HttpResponse.json({
                        data: {
                            visittkortEtiketter: {
                                ...tommeEtiketter,
                                dod: 'DOD',
                                diskresjonskode: '7',
                                sikkerhetstiltak: { etikett: 'Ansatte i samtale', beskrivelse: null },
                                skjerming: 'SKJERMET',
                                sykmeldt: 'SYKMELDT',
                                kvp: 'KVP'
                            }
                        },
                        errors: [
                            { message: 'Kunne ikke hente etikett', path: ['visittkortEtiketter', felt] },
                            { message: 'Kunne ikke hente KVP', path: ['visittkortEtiketter', 'kvp'] }
                        ]
                    })
                )
            );

            renderEtiketter();

            expect((await screen.findAllByRole('alert')).length).toBe(1);
            expect(
                screen.getByText(
                    'Kunne ikke laste alle viktige etiketter. Informasjon om beskyttelse, sikkerhet eller dødsfall kan mangle.'
                )
            ).toBeTruthy();
            expect(screen.getByText('Sykmeldt')).toBeTruthy();
            expect(screen.queryByText('KVP')).toBeNull();
            const tekster: Record<string, string> = {
                dod: 'Død',
                diskresjonskode: 'Kode 7',
                sikkerhetstiltak: 'Ansatte i samtale',
                skjerming: 'Skjermet'
            };
            expect(screen.queryByText(tekster[felt])).toBeNull();
        }
    );

    test.each([null, 'SYKMELDT'])('viser mindre alvorlig feil og beholder sykmeldt=%s', async sykmeldt => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: { ...tommeEtiketter, sykmeldt, kvp: 'KVP' } },
                    errors: [{ message: 'Kunne ikke hente KVP', path: ['visittkortEtiketter', 'kvp'] }]
                })
            )
        );

        renderEtiketter();

        expect((await screen.findAllByRole('alert')).length).toBe(1);
        expect(screen.getByText('Kunne ikke laste alle etiketter. Noe informasjon kan mangle.')).toBeTruthy();
        expect(!!screen.queryByText('Sykmeldt')).toBe(!!sykmeldt);
        expect(screen.queryByText('KVP')).toBeNull();
    });

    test('håndterer nestede og gjentatte feil uten å forkaste vellykkede etiketter', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            sikkerhetstiltak: { etikett: 'Ansatte i samtale', beskrivelse: null },
                            sykmeldt: 'SYKMELDT'
                        }
                    },
                    errors: [
                        {
                            message: 'Kunne ikke hente beskrivelse',
                            path: ['visittkortEtiketter', 'sikkerhetstiltak', 'beskrivelse']
                        },
                        {
                            message: 'Kunne ikke hente etikett',
                            path: ['visittkortEtiketter', 'sikkerhetstiltak', 'etikett']
                        }
                    ]
                })
            )
        );

        renderEtiketter();

        expect(await screen.findByRole('alert')).toBeTruthy();
        expect(screen.getByText('Sykmeldt')).toBeTruthy();
        expect(screen.queryByText('Ansatte i samtale')).toBeNull();
        expect(screen.getByText(/Kunne ikke laste alle viktige etiketter/)).toBeTruthy();
    });

    test.each<[string, () => Response]>([
        ['HTTP-feil', () => new HttpResponse(null, { status: 500 })],
        ['nettverksfeil', () => HttpResponse.error()],
        [
            'GraphQL-feil uten feltsti',
            () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: { ...tommeEtiketter, dod: 'DOD' } },
                    errors: [{ message: 'Kunne ikke hente alle etiketter' }]
                })
        ],
        ...[
            { navn: 'ukjent felt', path: ['visittkortEtiketter', 'ukjent'] },
            { navn: 'feil rot', path: ['person', 'dod'] },
            { navn: 'feil på hele etikettobjektet', path: ['visittkortEtiketter'] }
        ].map(({ navn, path }): [string, () => Response] => [
            navn,
            () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: { ...tommeEtiketter, dod: 'DOD' } },
                    errors: [{ message: 'Kunne ikke hente etiketter', path }]
                })
        ]),
        [
            'feil på alle felt',
            () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: tommeEtiketter },
                    errors: Object.keys(tommeEtiketter).map(felt => ({
                        message: 'Kunne ikke hente etikett',
                        path: ['visittkortEtiketter', felt]
                    }))
                })
        ],
        ['manglende data', () => HttpResponse.json({ data: { visittkortEtiketter: null } })]
    ])('viser lokal feilmelding ved %s', async (_navn, response) => {
        server.use(http.post('/veilarbperson/graphql', response));

        renderEtiketter();

        expect(await screen.findByRole('alert')).toBeTruthy();
        expect(screen.getByText('Kunne ikke laste etiketter. Prøv igjen senere.')).toBeTruthy();
        expect(screen.queryByText('Død')).toBeNull();
        expect(screen.queryByText('Ikke under oppfølging')).toBeNull();
    });
});
