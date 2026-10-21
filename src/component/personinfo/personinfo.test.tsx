import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';
import { setupServer } from 'msw/node';
import { delay, http, HttpResponse } from 'msw';
import { SWRConfig } from 'swr';
import PersonInfo from './personinfo';
import { mockPersonalia as mockPersonaliaData } from '../../mock/api/veilarbperson';
import { mockOppfolgingGraphqlResponse } from '../../mock/api/veilarboppfolging';
import { OppfolgingsDataGraphqlResponse } from '../../api/veilarboppfolging';
import { GraphqlResponse } from '../../api/GraphqlUtils';
import { Verge } from '../../api/veilarbperson';
import { useAppStore } from '../../store/app-store';

const brukerFnr = '10108000398';

// SWR har en global cache. Uten en egen provider per test vil resultatet fra én test
// kunne bli gjenbrukt (fra cache) i neste test siden brukerFnr er den samme.
const renderPersonInfo = () =>
    render(
        <SWRConfig value={{ provider: () => new Map() }}>
            <PersonInfo brukerFnr={brukerFnr} />
        </SWRConfig>
    );

const mockErUfordeltBruker = (erUfordelt: boolean) =>
    http.post('/veilarbportefolje/api/v1/hent-er-bruker-ufordelt', async () => {
        return HttpResponse.json(erUfordelt);
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

const mockPersonalia = (overrides: Partial<typeof mockPersonaliaData> = {}) =>
    http.post('/veilarbperson/graphql', async () => {
        return HttpResponse.json({ data: { person: { ...mockPersonaliaData, ...overrides } }, errors: null });
    });

const mockVerge = (harVergemaal: boolean) => {
    const response: Verge = {
        vergemaalEllerFremtidsfullmakt: harVergemaal
            ? [
                  {
                      type: 'Vergemål',
                      embete: null,
                      vergeEllerFullmektig: {
                          navn: { fornavn: null, mellomnavn: null, etternavn: null },
                          motpartsPersonident: null,
                          omfang: null
                      },
                      folkeregistermetadata: { ajourholdstidspunkt: null, gyldighetstidspunkt: null }
                  }
              ]
            : []
    };

    return http.post('/veilarbperson/api/v3/person/hent-vergeOgFullmakt', async () => HttpResponse.json(response));
};

const mockHuskelapp = () =>
    http.post('/veilarbportefolje/api/v1/hent-huskelapp-for-bruker', async () => {
        return HttpResponse.json({});
    });

const mockFargekategori = () =>
    http.post('/veilarbportefolje/api/v1/hent-fargekategori', async () => {
        await delay(0);
        return HttpResponse.json({
            id: 'uu-1-d',
            fnr: brukerFnr,
            fargekategoriVerdi: 'FARGEKATEGORI_C',
            sistEndret: new Date().toISOString(),
            endretAv: { veilederId: 'Z12345' }
        });
    });

const server = setupServer(
    mockPersonalia(),
    mockVerge(false),
    mockOppfolgingGraphql(),
    mockErUfordeltBruker(false),
    mockHuskelapp(),
    mockFargekategori()
);

describe('PersonInfo', () => {
    beforeAll(() => server.listen());
    beforeEach(() => useAppStore.setState({ brukerFnr }));
    afterEach(() => {
        server.resetHandlers();
        cleanup();
    });
    afterAll(() => server.close());

    test('viser navn og alder basert på personalia', async () => {
        server.use(mockPersonalia({ fornavn: 'GRØNN', mellomnavn: 'LIV', etternavn: 'STAFELLI' }));

        renderPersonInfo();

        expect(await screen.findByText(/Grønn Liv Stafelli/i)).toBeTruthy();
    });

    test('viser kvinne-ikon når personalia har kjønn KVINNE', async () => {
        server.use(mockPersonalia({ kjonn: 'KVINNE' }));

        renderPersonInfo();

        expect(await screen.findByAltText('kvinne')).toBeTruthy();
    });

    test('viser mann-ikon når personalia har kjønn MANN', async () => {
        server.use(mockPersonalia({ kjonn: 'MANN' }));

        renderPersonInfo();

        expect(await screen.findByAltText('mann')).toBeTruthy();
    });

    test('viser formatert telefonnummer når bruker har telefon', async () => {
        server.use(
            mockPersonalia({
                telefon: [{ prioritet: '1', telefonNr: '+4746333333', registrertDato: null, master: 'FREG' }]
            })
        );

        renderPersonInfo();

        expect(await screen.findByText('Tlf.: 46 33 33 33')).toBeTruthy();
    });

    test('merker telefonnummer med verge når vergeopplysninger finnes', async () => {
        server.use(
            mockPersonalia({
                telefon: [{ prioritet: '1', telefonNr: '+4746333333', registrertDato: null, master: 'FREG' }]
            }),
            mockVerge(true)
        );

        renderPersonInfo();

        expect(await screen.findByText('Tlf.: 46 33 33 33 (verge)')).toBeTruthy();
        expect(screen.getByRole('button', { name: 'Kopier telefonnummer til verge' })).toBeTruthy();
    });

    test('merker ikke telefonnummer med verge når det ikke har prioritet 1', async () => {
        server.use(
            mockPersonalia({
                telefon: [{ prioritet: '2', telefonNr: '80022222', registrertDato: null, master: 'KRR' }]
            }),
            mockVerge(true)
        );

        renderPersonInfo();

        expect(await screen.findByText('Tlf.: 80 02 22 22')).toBeTruthy();
        expect(screen.queryByRole('button', { name: 'Kopier telefonnummer til verge' })).toBeNull();
    });

    test('viser "Tlf.: -" når bruker ikke har telefonnummer', async () => {
        server.use(mockPersonalia({ telefon: [] }), mockVerge(true));

        renderPersonInfo();

        expect(await screen.findByText('Tlf.: -')).toBeTruthy();
        expect(screen.queryByText('Tlf.: - verge')).toBeNull();
    });

    test('viser knapp for å kopiere fødselsnummer', async () => {
        renderPersonInfo();

        expect(await screen.findByText(`F.nr.: ${brukerFnr}`)).toBeTruthy();
    });

    test('viser huskelapp- og fargekategoriknapp når veileder har tilgang til brukers kontor og bruker ikke er ufordelt', async () => {
        server.use(
            mockOppfolgingGraphql({
                brukerStatus: {
                    ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                    veilederTilordning: { veilederIdent: 'Z000004' }
                },
                veilederTilgang: {
                    harVeilederLeseTilgangTilBruker: true,
                    harVeilederLeseTilgangTilBrukersEnhet: true
                }
            }),
            mockErUfordeltBruker(false)
        );

        renderPersonInfo();

        await waitFor(() => {
            expect(screen.getByTitle('Opprett huskelapp')).toBeTruthy();
        });
        expect(screen.getByTitle('Ingen kategori: endre')).toBeTruthy();
    });

    test('skjuler huskelapp- og fargekategoriknapp når bruker er ufordelt', async () => {
        server.use(
            mockOppfolgingGraphql({
                brukerStatus: {
                    ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                    veilederTilordning: { veilederIdent: 'Z000004' }
                },
                veilederTilgang: {
                    harVeilederLeseTilgangTilBruker: true,
                    harVeilederLeseTilgangTilBrukersEnhet: true
                }
            }),
            mockErUfordeltBruker(true)
        );

        renderPersonInfo();

        await waitFor(() => {
            expect(screen.getByText(`F.nr.: ${brukerFnr}`)).toBeTruthy();
        });
        expect(screen.queryByTitle('Opprett huskelapp')).toBeNull();
        expect(screen.queryByTitle('Ingen kategori: endre')).toBeNull();
    });

    test('skjuler huskelapp- og fargekategoriknapp når bruker ikke har veileder', async () => {
        server.use(
            mockOppfolgingGraphql({
                brukerStatus: {
                    ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                    veilederTilordning: undefined
                },
                veilederTilgang: {
                    harVeilederLeseTilgangTilBruker: true,
                    harVeilederLeseTilgangTilBrukersEnhet: true
                }
            }),
            mockErUfordeltBruker(false)
        );

        renderPersonInfo();

        await waitFor(() => {
            expect(screen.getByText(`F.nr.: ${brukerFnr}`)).toBeTruthy();
        });
        expect(screen.queryByTitle('Opprett huskelapp')).toBeNull();
        expect(screen.queryByTitle('Ingen kategori: endre')).toBeNull();
    });

    test('skjuler huskelapp- og fargekategoriknapp når veileder ikke har tilgang til brukers kontor', async () => {
        server.use(
            mockOppfolgingGraphql({
                brukerStatus: {
                    ...mockOppfolgingGraphqlResponse.data.brukerStatus,
                    veilederTilordning: { veilederIdent: 'Z000004' }
                },
                veilederTilgang: {
                    harVeilederLeseTilgangTilBruker: false,
                    harVeilederLeseTilgangTilBrukersEnhet: false
                }
            }),
            mockErUfordeltBruker(false)
        );

        renderPersonInfo();

        await waitFor(() => {
            expect(screen.getByText(`F.nr.: ${brukerFnr}`)).toBeTruthy();
        });
        expect(screen.queryByTitle('Opprett huskelapp')).toBeNull();
        expect(screen.queryByTitle('Ingen kategori: endre')).toBeNull();
    });
});
