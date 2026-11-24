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
    adressebeskyttelse: null,
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

const ukjenteEtiketter: VisittkortEtiketter = {
    dod: 'UKJENT_PERSONALIA',
    adressebeskyttelse: 'UKJENT_PERSONALIA',
    utmeldingskandidat: 'UKJENT_UTMELDINGSKANDIDAT',
    sikkerhetstiltak: { etikett: 'UKJENT_SIKKERHETSTILTAK', beskrivelse: null },
    skjerming: 'UKJENT_SKJERMING',
    vergemaalOppfolging: 'UKJENT_REPRESENTASJON',
    fullmaktOppfolging: 'UKJENT_REPRESENTASJON',
    tegnspraaktolk: 'UKJENT_TOLKEBEHOV',
    talespraaktolk: 'UKJENT_TOLKEBEHOV',
    kvp: 'UKJENT_OPPFOLGING',
    manuellOppfolging: 'UKJENT_OPPFOLGING',
    reservertKrr: 'UKJENT_KRR',
    utdatertIKrr: 'UKJENT_KRR',
    ikkeUnderOppfolging: 'UKJENT_OPPFOLGING',
    varsel: 'UKJENT_VARSEL',
    ikkeRegistrertKrr: 'UKJENT_KRR',
    trengerOppfolgingsvedtak: 'UKJENT_OPPFOLGINGSVEDTAK',
    sykmeldt: 'UKJENT_OPPFOLGING',
    iArbeidssokerregisteret: 'UKJENT_ARBEIDSSOKERREGISTER',
    antattGodeMuligheter: 'UKJENT_PROFILERING',
    antattBehovForVeiledning: 'UKJENT_PROFILERING',
    oppgittHindringer: 'UKJENT_PROFILERING'
};

const alvorligeFelter: readonly (keyof VisittkortEtiketter)[] = [
    'dod',
    'adressebeskyttelse',
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
    'ikkeRegistrertKrr'
];

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
                            adressebeskyttelse: 'KODE_7',
                            sikkerhetstiltak: { etikett: 'SIKKERHETSTILTAK', beskrivelse: 'To ansatte i samtale' },
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
        expect(screen.getByText('To ansatte i samtale').getAttribute('title')).toBe('To ansatte i samtale');
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
        expect(mottattRequest.mock.calls[0][0].query).toContain('adressebeskyttelse');
        expect(mottattRequest.mock.calls[0][0].query).not.toContain('diskresjonskode');
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

    test.each(alvorligeFelter)(
        'viser alvorlig feil ved feil i %s, beholder vellykkede etiketter og prioriterer over mindre alvorlige feil',
        async felt => {
            server.use(
                http.post('/veilarbperson/graphql', () =>
                    HttpResponse.json({
                        data: {
                            visittkortEtiketter: {
                                ...tommeEtiketter,
                                dod: 'DOD',
                                adressebeskyttelse: 'KODE_7',
                                sikkerhetstiltak: { etikett: 'SIKKERHETSTILTAK', beskrivelse: 'Ansatte i samtale' },
                                skjerming: 'SKJERMET',
                                vergemaalOppfolging: 'VERGEMAAL_OPPFOLGING',
                                fullmaktOppfolging: 'FULLMAKT_OPPFOLGING',
                                tegnspraaktolk: 'TEGNSPRAAKTOLK',
                                talespraaktolk: 'TALESPRAAKTOLK',
                                manuellOppfolging: 'MANUELL_OPPFOLGING',
                                reservertKrr: 'RESERVERT_KRR',
                                utdatertIKrr: 'UTDATERT_I_KRR',
                                ikkeRegistrertKrr: 'IKKE_REGISTRERT_KRR',
                                sykmeldt: 'SYKMELDT',
                                kvp: 'KVP',
                                varsel: 'VARSEL'
                            }
                        },
                        errors: [
                            { message: 'Kunne ikke hente etikett', path: ['visittkortEtiketter', felt] },
                            { message: 'Kunne ikke hente varsel', path: ['visittkortEtiketter', 'varsel'] }
                        ]
                    })
                )
            );

            renderEtiketter();

            expect((await screen.findAllByRole('alert')).length).toBe(1);
            expect(
                screen.getByText(
                    'Kunne ikke hente alle etiketter. Status for f.eks. adressebeskyttelse og sikkerhetstiltak kan mangle. Prøv igjen senere.'
                )
            ).toBeTruthy();
            expect(screen.getByText('Sykmeldt')).toBeTruthy();
            expect(screen.queryByText('Varsel')).toBeNull();
            const tekster: Record<string, string> = {
                dod: 'Død',
                adressebeskyttelse: 'Kode 7',
                sikkerhetstiltak: 'Ansatte i samtale',
                skjerming: 'Skjermet',
                vergemaalOppfolging: 'Vergemål',
                fullmaktOppfolging: 'Fullmakt Oppfølging',
                tegnspraaktolk: 'Tegnspråktolk',
                talespraaktolk: 'Språktolk',
                kvp: 'KVP',
                manuellOppfolging: 'Manuell oppfølging',
                reservertKrr: 'Reservert KRR',
                utdatertIKrr: 'Utdatert i KRR',
                ikkeRegistrertKrr: 'Ikke registrert KRR'
            };
            expect(screen.queryByText(tekster[felt])).toBeNull();
        }
    );

    test.each([null, 'SYKMELDT'])('viser mindre alvorlig feil og beholder sykmeldt=%s', async sykmeldt => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: { visittkortEtiketter: { ...tommeEtiketter, sykmeldt, varsel: 'UKJENT_VARSEL' } }
                })
            )
        );

        renderEtiketter();

        expect((await screen.findAllByRole('alert')).length).toBe(1);
        expect(
            screen.getByText('Kunne ikke hente alle etiketter. Noe informasjon kan mangle. Prøv igjen senere.')
        ).toBeTruthy();
        expect(!!screen.queryByText('Sykmeldt')).toBe(!!sykmeldt);
        expect(screen.queryByText('Varsel')).toBeNull();
        if (sykmeldt) {
            const etikettboks = screen.getByText('Sykmeldt').closest('.etikett-container');
            const feilmelding = screen.getByRole('alert');
            expect(etikettboks).not.toBeNull();
            expect(etikettboks?.parentElement).toBe(feilmelding.parentElement);
            expect(etikettboks?.contains(feilmelding)).toBe(false);
            expect(feilmelding.nextElementSibling).toBe(etikettboks);
        }
    });

    test('håndterer nestede og gjentatte feil uten å forkaste vellykkede etiketter', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            sikkerhetstiltak: { etikett: 'SIKKERHETSTILTAK', beskrivelse: 'Ansatte i samtale' },
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
        expect(screen.getByText(/Kunne ikke hente alle etiketter\. Status for f\.eks\./)).toBeTruthy();
    });

    test.each(Object.entries(ukjenteEtiketter))(
        'behandler ukjent verdi for %s som feil uten GraphQL-errors',
        async (felt, verdi) => {
            const vellykketFelt = felt === 'sykmeldt' ? 'kvp' : 'sykmeldt';
            const vellykketTekst = felt === 'sykmeldt' ? 'KVP' : 'Sykmeldt';
            server.use(
                http.post('/veilarbperson/graphql', () =>
                    HttpResponse.json({
                        data: {
                            visittkortEtiketter: {
                                ...tommeEtiketter,
                                [vellykketFelt]: felt === 'sykmeldt' ? 'KVP' : 'SYKMELDT',
                                [felt]: verdi
                            }
                        }
                    })
                )
            );

            const { container } = renderEtiketter();

            expect((await screen.findAllByRole('alert')).length).toBe(1);
            expect(screen.getByText(vellykketTekst)).toBeTruthy();
            expect(container.querySelectorAll('.aksel-tag').length).toBe(1);
            expect(container.textContent).not.toContain('UKJENT_');
            const alvorlig = alvorligeFelter.some(alvorligFelt => alvorligFelt === felt);
            expect(
                screen.getByText(
                    alvorlig
                        ? 'Kunne ikke hente alle etiketter. Status for f.eks. adressebeskyttelse og sikkerhetstiltak kan mangle. Prøv igjen senere.'
                        : 'Kunne ikke hente alle etiketter. Noe informasjon kan mangle. Prøv igjen senere.'
                )
            ).toBeTruthy();
        }
    );

    test('viser alvorlig feil og beholder vellykkede etiketter når bare tolk er ukjent', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            dod: 'DOD',
                            adressebeskyttelse: 'KODE_6',
                            sikkerhetstiltak: { etikett: 'SIKKERHETSTILTAK', beskrivelse: 'Fysisk utestengelse' },
                            tegnspraaktolk: 'UKJENT_TOLKEBEHOV',
                            talespraaktolk: 'UKJENT_TOLKEBEHOV'
                        }
                    }
                })
            )
        );

        renderEtiketter();

        expect(await screen.findByRole('alert')).toBeTruthy();
        expect(screen.getByText(/Kunne ikke hente alle etiketter\. Status for f\.eks\./)).toBeTruthy();
        expect(screen.getByText('Død')).toBeTruthy();
        expect(screen.getByText('Kode 6')).toBeTruthy();
        expect(screen.getByText('Fysisk utestengelse')).toBeTruthy();
        expect(screen.queryByText('Tegnspråktolk')).toBeNull();
        expect(screen.queryByText('Språktolk')).toBeNull();
    });

    test('kombinerer ukjente verdier og GraphQL-feil med alvorlig feil som høyeste prioritet', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            skjerming: 'UKJENT_SKJERMING',
                            varsel: 'VARSEL',
                            sykmeldt: 'SYKMELDT'
                        }
                    },
                    errors: [{ message: 'Kunne ikke hente varsel', path: ['visittkortEtiketter', 'varsel'] }]
                })
            )
        );

        renderEtiketter();

        expect((await screen.findAllByRole('alert')).length).toBe(1);
        expect(screen.getByText(/Kunne ikke hente alle etiketter\. Status for f\.eks\./)).toBeTruthy();
        expect(screen.getByText('Sykmeldt')).toBeTruthy();
        expect(screen.queryByText('Skjermet')).toBeNull();
        expect(screen.queryByText('Varsel')).toBeNull();
    });

    test.each(['KODE_6', 'KODE_7', 'KODE_19'])('viser adressebeskyttelse %s som kodeetikett', async kode => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({ data: { visittkortEtiketter: { ...tommeEtiketter, adressebeskyttelse: kode } } })
            )
        );

        renderEtiketter();

        expect(await screen.findByText(kode.replace('KODE_', 'Kode '))).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
    });

    test('beholder folkeregisterstatus ukjent som gyldig etikett, ikke feilstatus', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: { ...tommeEtiketter, utmeldingskandidat: 'FOLKEREGISTERSTATUS_UKJENT' }
                    }
                })
            )
        );

        renderEtiketter();

        expect(await screen.findByText('Folkeregisterstatus: Ukjent')).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
    });

    test('viser sikkerhetstiltak uten beskrivelse som Sikkerhetstiltak', async () => {
        server.use(
            http.post('/veilarbperson/graphql', () =>
                HttpResponse.json({
                    data: {
                        visittkortEtiketter: {
                            ...tommeEtiketter,
                            sikkerhetstiltak: { etikett: 'SIKKERHETSTILTAK', beskrivelse: null }
                        }
                    }
                })
            )
        );

        renderEtiketter();

        expect(await screen.findByText('Sikkerhetstiltak')).toBeTruthy();
        expect(screen.queryByRole('alert')).toBeNull();
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
            'alle etiketter er ukjente uten GraphQL-errors',
            () => HttpResponse.json({ data: { visittkortEtiketter: ukjenteEtiketter } })
        ],
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
        expect(
            screen.getByText(
                'Kunne ikke hente etiketter. Har ikke status for bl.a. adressebeskyttelse og sikkerhetstiltak. Prøv igjen senere.'
            )
        ).toBeTruthy();
        expect(screen.queryByText('Død')).toBeNull();
        expect(screen.queryByText('Ikke under oppfølging')).toBeNull();
    });
});
