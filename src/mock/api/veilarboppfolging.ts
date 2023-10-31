import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import {
    AvslutningStatus,
    InnstillingHistorikkInnslag,
    Oppfolging,
    OppfolgingStatus
} from '../../api/veilarboppfolging';
import { mockInnloggetVeileder } from './veilarbveileder';
import { defaultNetworkResponseDelay } from '../config';

const mockAvslutningStatus: AvslutningStatus = {
    kanAvslutte: true,
    harYtelser: false,
    underOppfolging: true,
    inaktiveringsDato: null,
    underKvp: false,
    erIserv: false
};

const mockOppfolgingAvsluttetStatus: AvslutningStatus = {
    kanAvslutte: false,
    harYtelser: false,
    underOppfolging: false,
    inaktiveringsDato: null,
    underKvp: false,
    erIserv: false
};

const mockInnstillingsHistorikk: InnstillingHistorikkInnslag[] = [
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2022-01-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z000004',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z000003',
        dialogId: null
    },
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2021-08-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z000003',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z000002',
        dialogId: null
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
        dialogId: null
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
    fnr: '123456',
    veilederId: mockInnloggetVeileder.ident,
    reservasjonKRR: true,
    manuell: true,
    underOppfolging: true,
    underKvp: true,
    oppfolgingUtgang: '2019-03-28T11:12:40.973+01:00',
    kanStarteOppfolging: true,
    oppfolgingsPerioder: [
        {
            aktorId: '00007',
            veileder: null,
            startDato: '2017-12-02T18:37:24.717+01:00',
            sluttDato: '2019-03-28T11:12:40.973+01:00',
            begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
            kvpPerioder: []
        }
    ],
    harSkriveTilgang: true,
    inaktivIArena: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2019-02-22T00:00:00+01:00',
    erSykmeldtMedArbeidsgiver: false,
    erIkkeArbeidssokerUtenOppfolging: false,
    kanVarsles: true
};

const mockOppfolgingsstatus: OppfolgingStatus = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007'
    },
    veilederId: mockInnloggetVeileder.ident,
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART'
};

export const veilarboppfolgingHandlers: RequestHandlersList = [
    rest.post('/veilarboppfolging/api/v2/tilordneveileder', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json({ feilendeTilordninger: [] }));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/veilederTilgang/hent', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json({ tilgangTilBrukersKontor: true }));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/innstillingsHistorikk', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockInnstillingsHistorikk));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/avsluttOppfolging', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockOppfolgingAvsluttetStatus));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/settManuell', (req, res, ctx) => {
        return res(
            ctx.delay(defaultNetworkResponseDelay),
            ctx.json(Object.assign({}, mockOppfolging, { manuell: true }))
        );
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/avslutningStatus/hent', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockAvslutningStatus));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/startKvp', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.status(204));
    }),
    rest.post('/veilarboppfolging/api/v2/oppfolging/stoppKvp', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.status(204));
    }),
    rest.post('/veilarboppfolging/api/v2/person/oppfolgingsstatus/hent', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockOppfolgingsstatus));
    }),
    rest.post('/veilarboppfolging/api/v2/hent-oppfolging', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockOppfolging));
    })
];
