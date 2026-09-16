import {
    AvslutningStatus,
    ForlengOppfolgingRequest,
    InnstillingHistorikkInnslag,
    Oppfolging,
    OppfolgingsDataGraphqlResponse
} from '../../api/veilarboppfolging';
import { mockInnloggetVeileder } from './veilarbveileder';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { GraphqlResponse } from '../../api/GraphqlUtils';

const mockAvslutningStatus: AvslutningStatus = {
    kanAvslutte: true,
    underOppfolging: true,
    inaktiveringsDato: null,
    underKvp: false,
    erIserv: true,
    harAktiveTiltaksdeltakelser: false,
    erDeltakerIUngdomsprogrammet: false,
    erArbeidssoeker: false,
    harAap: false
};

const mockOppfolgingAvsluttetStatus: AvslutningStatus = {
    kanAvslutte: false,
    underOppfolging: false,
    inaktiveringsDato: null,
    underKvp: false,
    erIserv: false,
    harAktiveTiltaksdeltakelser: false,
    erDeltakerIUngdomsprogrammet: false,
    erArbeidssoeker: false,
    harAap: true
};

const mockInnstillingsHistorikk: InnstillingHistorikkInnslag[] = [
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2022-01-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z000004',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z000003',
        dialogId: null,
        tildeltVeilederId: 'Z000004'
    },
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2021-08-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z000003',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z000002',
        dialogId: null,
        tildeltVeilederId: 'Z000003'
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-08-14T13:56:53.813+02:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null
    },
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2019-08-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z000002',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: null,
        dialogId: null,
        tildeltVeilederId: 'Z000002'
    },
    {
        type: 'OPPFOLGINGSENHET_ENDRET',
        dato: '2019-09-30T12:23:48.116+01:00',
        begrunnelse: 'Ny oppfølgingsenhet 1337',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
        enhet: '1337'
    },
    {
        type: 'OPPFOLGINGSENHET_ENDRET',
        dato: '2016-09-30T12:23:48.116+01:00',
        begrunnelse: 'Ny oppfølgingsenhet 1234',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
        enhet: '1234'
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-10-30T12:23:48.116+01:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-09-03T13:17:41.325+02:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2019-01-28T09:30:23.76+01:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: null,
        dialogId: null
    }
];

const mockOppfolging: Oppfolging = {
    harVeilederLeseTilgangTilBruker: true,
    harVeilederLeseTilgangTilBrukersEnhet: true,
    veilederId: mockInnloggetVeileder.ident,
    reservasjonKRR: true,
    manuell: true,
    underOppfolging: true,
    registrertKRR: false,
    underKvp: true,
    inaktivIArena: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2019-02-22T00:00:00+01:00',
    kanVarsles: true
};

const mockForlengOppfolging: ForlengOppfolgingRequest = {
    fnr: '12345678901',
    forlengetTil: '2026-09-02'
};

const mockUtmeldingskandidatHendelser: OppfolgingsDataGraphqlResponse['utmeldingskandidat']['utmeldingskandidatHendelser'] =
    [
        {
            utfortAvType: 'SYSTEM',
            utfortAv: undefined,
            hendelseTidspunkt: '2026-09-09T08:15:00.000Z',
            type: 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE',
            forlengetTil: undefined
        },
        {
            utfortAvType: 'VEILEDER',
            utfortAv: 'Z123456',
            hendelseTidspunkt: '2026-09-10T08:15:00.000Z',
            type: 'FORLENGELSE_OPPRETTET',
            forlengetTil: '2026-10-31'
        },
        {
            utfortAvType: 'VEILEDER',
            utfortAv: 'Z000003',
            hendelseTidspunkt: '2026-09-11T08:15:00.000Z',
            type: 'FORLENGELSE_ENDRET',
            forlengetTil: '2026-11-15'
        },
        {
            utfortAvType: 'SYSTEM',
            utfortAv: undefined,
            hendelseTidspunkt: '2026-11-16T08:15:00.000Z',
            type: 'FORLENGELSE_UTLOPT',
            forlengetTil: undefined
        }
    ];

export const mockOppfolgingGraphqlResponse: GraphqlResponse<OppfolgingsDataGraphqlResponse> = {
    errors: [],
    data: {
        veilederTilgang: {
            harVeilederLeseTilgangTilBruker: true,
            harVeilederLeseTilgangTilBrukersEnhet: true
        },
        oppfolgingsEnhet: {
            enhet: {
                navn: 'Nav TestHeim',
                id: '007'
            }
        },
        brukerStatus: {
            arena: {
                inaktivIArena: true,
                inaktiveringsdato: null,
                kanReaktiveres: undefined,
                formidlingsgruppe: 'ARBS',
                kvalifiseringsgruppe: 'IKVAL'
            },
            manuell: {
                erManuell: false
            },
            krr: {
                kanVarsles: false,
                reservertIKrr: false,
                registrertIKrr: true
            },
            erKontorsperret: true,
            veilederTilordning: {
                veilederIdent: mockInnloggetVeileder.ident
            }
        },
        oppfolging: {
            erUnderOppfolging: true
        },
        utmeldingskandidat: {
            /*aktivForlengelse: {
                utfortAvType: 'VEILEDER',
                utfortAv: 'Z123456',
                hendelseTidspunkt: '2026-09-08T13:28:40.558650Z',
                forlengetTil: '2026-10-31'
            },*/
            aktivForlengelse: null,
            utmeldingskandidatHendelser: mockUtmeldingskandidatHendelser,
            tag: 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE'
        }
    }
};

export const veilarboppfolgingHandlers: RequestHandler[] = [
    http.post('/veilarboppfolging/api/tilordneveileder', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({ feilendeTilordninger: [] });
    }),
    http.post('/veilarboppfolging/api/v3/hent-instillingshistorikk', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockInnstillingsHistorikk);
    }),
    http.post('/veilarboppfolging/api/v2/oppfolging/avslutt', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockOppfolgingAvsluttetStatus);
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/settManuell', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(Object.assign({}, mockOppfolging, { manuell: true }));
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/hent-avslutning-status', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockAvslutningStatus);
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/startKvp', async () => {
        await delay(defaultNetworkResponseDelay);
        return new HttpResponse(null, { status: 204 });
    }),
    http.post('/veilarboppfolging/api/v3/oppfolging/stoppKvp', async () => {
        await delay(defaultNetworkResponseDelay);
        return new HttpResponse(null, { status: 204 });
    }),
    http.post('/veilarboppfolging/api/graphql', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockOppfolgingGraphqlResponse);
    }),
    http.post('/veilarboppfolging/api/forlengelse', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockForlengOppfolging);
    })
];
