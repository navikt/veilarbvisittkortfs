import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { SWRConfig } from 'swr';
import { Veilederverktoy } from './veilederverktoy';
import { mockOppfolgingGraphqlResponse } from '../../mock/api/veilarboppfolging';
import { OppfolgingsDataGraphqlResponse } from '../../api/veilarboppfolging';
import { GraphqlResponse } from '../../api/GraphqlUtils';
import { GjeldendeEskaleringsvarsel, veilarbDialogGraphqlEndpoint } from '../../api/veilarbdialog';
import { useAppStore } from '../../store/app-store';
import { VisittKortConfigContext, VisittkortConfig } from '../../store/visittkort-config';

const brukerFnr = '10108000398';

const mockErUfordeltBruker = (erUfordelt: boolean) =>
    http.post('/veilarbportefolje/api/v1/hent-er-bruker-ufordelt', async () => {
        return HttpResponse.json(erUfordelt);
    });

const mockHuskelappForBruker = (huskelapp: object | null) =>
    http.post('/veilarbportefolje/api/v1/hent-huskelapp-for-bruker', async () => {
        return HttpResponse.json(huskelapp);
    });

const mockOppfolgingGraphql = (overrides: Partial<OppfolgingsDataGraphqlResponse> = {}) =>
    http.post('/veilarboppfolging/api/graphql', async () => {
        const response: GraphqlResponse<OppfolgingsDataGraphqlResponse> = {
            ...mockOppfolgingGraphqlResponse,
            data: {
                ...mockOppfolgingGraphqlResponse.data,
                ...overrides
            }
        };
        return HttpResponse.json(response);
    });

const mockGjeldendeEskaleringsvarsel = (varsel: GjeldendeEskaleringsvarsel | null) =>
    http.post(veilarbDialogGraphqlEndpoint, async ({ request }) => {
        const body = (await request.json()) as { query: string };
        if (body.query.includes('stansVarselHistorikk')) {
            return HttpResponse.json({ data: { stansVarselHistorikk: [] } });
        } else if (body.query.includes('stansVarsel')) {
            return HttpResponse.json({ data: { stansVarsel: varsel } });
        }
        return HttpResponse.json({ data: { dialoger: [] } });
    });

const mockOpplysningerOmArbeidssoker = () =>
    http.post('/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering', async () => {
        return HttpResponse.json({});
    });

const mockLoggerEvent = () =>
    http.post('/veilarbperson/api/logger/event', async () => {
        return new HttpResponse(null, { status: 200 });
    });

const server = setupServer(
    mockOppfolgingGraphql(),
    mockErUfordeltBruker(false),
    mockHuskelappForBruker(null),
    mockGjeldendeEskaleringsvarsel(null),
    mockOpplysningerOmArbeidssoker(),
    mockLoggerEvent()
);

const defaultConfig: VisittkortConfig = {
    tilbakeTilFlate: '',
    visVeilederVerktoy: true
};

// SWR har en global cache. Uten en egen provider per test vil resultatet fra én test
// kunne bli gjenbrukt (fra cache) i neste test siden brukerFnr er den samme.
const renderVeilederverktoy = (config: VisittkortConfig = defaultConfig) =>
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <VisittKortConfigContext.Provider value={config}>
                <Veilederverktoy />
            </VisittKortConfigContext.Provider>
        </SWRConfig>
    );

const apneMeny = async () => {
    const toggleKnapp = await screen.findByRole('button', { name: 'Veilederverktøy' });
    fireEvent.click(toggleKnapp);
    await waitFor(() => {
        expect(screen.getByText('Vis historikk')).toBeTruthy();
    });
};

describe('Veilederverktoy', () => {
    beforeAll(() => server.listen());
    beforeEach(() => useAppStore.setState({ brukerFnr }));
    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });
    afterAll(() => server.close());

    describe('Synlighet av veilederverktøy', () => {
        test('vises ikke når visVeilederVerktoy er false', async () => {
            renderVeilederverktoy({ ...defaultConfig, visVeilederVerktoy: false });

            await waitFor(() => {
                expect(screen.queryByRole('button', { name: 'Veilederverktøy' })).toBeNull();
            });
        });

        test('vises når visVeilederVerktoy er true', async () => {
            renderVeilederverktoy();

            expect(await screen.findByRole('button', { name: 'Veilederverktøy' })).toBeTruthy();
        });
    });

    describe('Huskelapp', () => {
        test('viser "Lag huskelapp" når veileder har tilgang og ingen huskelapp finnes', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        veilederTilordning: { veilederIdent: 'Z000004' }
                    }
                }),
                mockErUfordeltBruker(false),
                mockHuskelappForBruker(null)
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Lag huskelapp')).toBeTruthy();
        });

        test('viser "Rediger huskelapp" når veileder har tilgang og huskelapp finnes', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        veilederTilordning: { veilederIdent: 'Z000004' }
                    }
                }),
                mockErUfordeltBruker(false),
                mockHuskelappForBruker({ huskelappId: 'abc-123' })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Rediger huskelapp')).toBeTruthy();
        });

        test('skjuler huskelapp-knapp når bruker er ufordelt', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        veilederTilordning: { veilederIdent: 'Z000004' }
                    }
                }),
                mockErUfordeltBruker(true),
                mockHuskelappForBruker({ huskelappId: 'abc-123' })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Lag huskelapp')).toBeNull();
            expect(screen.queryByText('Rediger huskelapp')).toBeNull();
        });

        test('skjuler huskelapp-knapp når bruker ikke har veileder', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        veilederTilordning: undefined
                    }
                }),
                mockErUfordeltBruker(false),
                mockHuskelappForBruker({ huskelappId: 'abc-123' })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Lag huskelapp')).toBeNull();
            expect(screen.queryByText('Rediger huskelapp')).toBeNull();
        });

        test('skjuler huskelapp-knapp når veileder ikke har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: false,
                        harVeilederLeseTilgangTilBrukersEnhet: false
                    },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        veilederTilordning: { veilederIdent: 'Z000004' }
                    }
                }),
                mockErUfordeltBruker(false),
                mockHuskelappForBruker({ huskelappId: 'abc-123' })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Lag huskelapp')).toBeNull();
            expect(screen.queryByText('Rediger huskelapp')).toBeNull();
        });
    });

    describe('Tildel veileder', () => {
        test('viser "Tildel veileder" når bruker er under oppfølging og veileder har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Tildel veileder')).toBeTruthy();
        });

        test('skjuler "Tildel veileder" når veileder ikke har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: false,
                        harVeilederLeseTilgangTilBrukersEnhet: false
                    },
                    oppfolging: { erUnderOppfolging: true }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Tildel veileder')).toBeNull();
        });

        test('skjuler "Tildel veileder" når bruker ikke er under oppfølging', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: false }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Tildel veileder')).toBeNull();
        });
    });

    describe('Eskaleringsvarsel', () => {
        const eskaleringsvarsel: GjeldendeEskaleringsvarsel = {
            id: 1,
            tilhorendeDialogId: 42,
            opprettetAv: 'Z123456',
            opprettetDato: new Date().toISOString(),
            opprettetBegrunnelse: 'begrunnelse'
        };

        test('viser "Send varsel" når vilkårene for å starte eskalering er oppfylt', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        erKontorsperret: false,
                        manuell: { erManuell: false },
                        krr: { kanVarsles: true, reservertIKrr: false, registrertIKrr: true }
                    }
                }),
                mockGjeldendeEskaleringsvarsel(null)
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Send varsel')).toBeTruthy();
            expect(screen.queryByText('Deaktiver varsel')).toBeNull();
        });

        test('viser "Deaktiver varsel" når det finnes et gjeldende eskaleringsvarsel', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true }
                }),
                mockGjeldendeEskaleringsvarsel(eskaleringsvarsel)
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Deaktiver varsel')).toBeTruthy();
            expect(screen.queryByText('Send varsel')).toBeNull();
        });

        test('skjuler både "Send varsel" og "Deaktiver varsel" når veileder ikke har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: false,
                        harVeilederLeseTilgangTilBrukersEnhet: false
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        erKontorsperret: false
                    }
                }),
                mockGjeldendeEskaleringsvarsel(eskaleringsvarsel)
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Send varsel')).toBeNull();
            expect(screen.queryByText('Deaktiver varsel')).toBeNull();
        });
    });

    describe('Manuell / digital oppfølging', () => {
        test('viser "Endre til manuell oppfølging" når bruker har digital oppfølging', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        manuell: { erManuell: false }
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Endre til manuell oppfølging')).toBeTruthy();
            expect(screen.queryByText('Endre til digital oppfølging')).toBeNull();
        });

        test('viser "Endre til digital oppfølging" når bruker har manuell oppfølging', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        manuell: { erManuell: true }
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Endre til digital oppfølging')).toBeTruthy();
            expect(screen.queryByText('Endre til manuell oppfølging')).toBeNull();
        });
    });

    describe('KVP', () => {
        test('viser "Start KVP-periode" når bruker ikke er under kvp', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        erKontorsperret: false
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Start KVP-periode')).toBeTruthy();
            expect(screen.queryByText('Avslutt KVP-periode')).toBeNull();
        });

        test('viser "Avslutt KVP-periode" når bruker er under kvp', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        erKontorsperret: true
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Avslutt KVP-periode')).toBeTruthy();
            expect(screen.queryByText('Start KVP-periode')).toBeNull();
        });
    });

    describe('Avslutt oppfølging', () => {
        test('viser "Avslutt oppfølging" når bruker er under oppfølging og veileder har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: true }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Avslutt oppfølging')).toBeTruthy();
        });

        test('skjuler "Avslutt oppfølging" når veileder ikke har tilgang til brukers kontor', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: false,
                        harVeilederLeseTilgangTilBrukersEnhet: false
                    },
                    oppfolging: { erUnderOppfolging: true }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Avslutt oppfølging')).toBeNull();
        });

        test('skjuler "Avslutt oppfølging" når bruker ikke er under oppfølging', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: true,
                        harVeilederLeseTilgangTilBrukersEnhet: true
                    },
                    oppfolging: { erUnderOppfolging: false }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Avslutt oppfølging')).toBeNull();
        });
    });

    describe('Bytt oppfølgingskontor', () => {
        test('vises når bruker er under oppfølging', async () => {
            server.use(mockOppfolgingGraphql({ oppfolging: { erUnderOppfolging: true } }));

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Bytt oppfølgingskontor')).toBeTruthy();
        });

        test('skjules når bruker ikke er under oppfølging', async () => {
            server.use(mockOppfolgingGraphql({ oppfolging: { erUnderOppfolging: false } }));

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Bytt oppfølgingskontor')).toBeNull();
        });
    });

    describe('Alltid synlige knapper', () => {
        test('viser "Opprett Gosys-oppgave", "Vis historikk" og "Arbeidssøkerregisteret" uavhengig av tilgang', async () => {
            server.use(
                mockOppfolgingGraphql({
                    veilederTilgang: {
                        harVeilederLeseTilgangTilBruker: false,
                        harVeilederLeseTilgangTilBrukersEnhet: false
                    },
                    oppfolging: { erUnderOppfolging: false }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Opprett Gosys-oppgave')).toBeTruthy();
            expect(screen.getByText('Vis historikk')).toBeTruthy();
            expect(screen.getByText('Arbeidssøkerregisteret')).toBeTruthy();
        });
    });

    describe('Start arbeidsrettet oppfølging', () => {
        test('viser "Start arbeidsrettet oppfølging" når bruker ikke er under oppfølging', async () => {
            server.use(mockOppfolgingGraphql({ oppfolging: { erUnderOppfolging: false } }));

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Start arbeidsrettet oppfølging')).toBeTruthy();
        });

        test('viser "Reaktiver arbeidsrettet oppfølging" når bruker er under oppfølging og er iserv i Arena', async () => {
            server.use(
                mockOppfolgingGraphql({
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        arena: {
                            ...mockOppfolgingGraphqlResponse.data.brukerStatus.arena!,
                            formidlingsgruppe: 'ISERV'
                        }
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.getByText('Reaktiver arbeidsrettet oppfølging')).toBeTruthy();
        });

        test('skjuler knappen når bruker er under oppfølging og ikke er iserv i Arena', async () => {
            server.use(
                mockOppfolgingGraphql({
                    oppfolging: { erUnderOppfolging: true },
                    brukerStatus: {
                        ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                        arena: {
                            ...mockOppfolgingGraphqlResponse.data.brukerStatus.arena!,
                            formidlingsgruppe: 'ARBS'
                        }
                    }
                })
            );

            renderVeilederverktoy();
            await apneMeny();

            expect(screen.queryByText('Start arbeidsrettet oppfølging')).toBeNull();
            expect(screen.queryByText('Reaktiver arbeidsrettet oppfølging')).toBeNull();
        });
    });
});
