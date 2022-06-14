import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import {
    AvslutningStatus,
    InnstillingHistorikkInnslag,
    Oppfolging,
    OppfolgingStatus
} from '../../api/veilarboppfolging';
import { mockInnloggetVeileder } from './veilarbveileder';

const mockAvslutningStatus: AvslutningStatus = {
    kanAvslutte: true,
    harYtelser: false,
    underOppfolging: true,
    inaktiveringsDato: null,
    underKvp: false
};

const mockOppfolgingAvsluttetStatus: AvslutningStatus = {
    kanAvslutte: false,
    harYtelser: false,
    underOppfolging: false,
    inaktiveringsDato: null,
    underKvp: false
};

const mockInnstillingsHistorikk: InnstillingHistorikkInnslag[] = [
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
        begrunnelse: 'Brukeren er tildelt veileder Z0002',
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
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T12:45:09.571+01:00',
        begrunnelse: 'TEST AV OPPGAVE (TONE)',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990279',
        dialogId: 1412
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-07T15:11:41.997+01:00',
        begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990279',
        dialogId: 1412
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T18:04:50.498+01:00',
        begrunnelse: 'Test varsel om oppgave i aktivitetsplan 7/3 kl 1804',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1415
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-27T09:32:51.748+01:00',
        begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.\nasdfasdfasdfasdfsadfasdf',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990781',
        dialogId: 1415
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T15:11:54.465+01:00',
        begrunnelse: 'TEst ',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1413
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-07T18:04:06.707+01:00',
        begrunnelse: null,
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1413
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
    gjeldendeEskaleringsvarsel: {
        varselId: '1',
        aktorId: '112345',
        oppretterAv: 'Z9091',
        opprettetDato: '2019-03-28T11:12:40.973+01:00',
        avsluttetDato: null,
        tilhorendeDialogId: '1'
    },
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
    rest.post('/veilarboppfolging/api/tilordneveileder', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json({ feilendeTilordninger: [] }));
    }),
    rest.get('/veilarboppfolging/api/oppfolging/veilederTilgang', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json({ tilgangTilBrukersKontor: true }));
    }),
    rest.get('/veilarboppfolging/api/oppfolging/innstillingsHistorikk', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockInnstillingsHistorikk));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/startEskalering/', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.status(204));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/avsluttOppfolging', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppfolgingAvsluttetStatus));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/settManuell', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(Object.assign({}, mockOppfolging, { manuell: true })));
    }),
    rest.get('/veilarboppfolging/api/oppfolging/avslutningStatus', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockAvslutningStatus));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/startKvp', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.status(204));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/stoppKvp', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.status(204));
    }),
    rest.get('/veilarboppfolging/api/person/:fnr/oppfolgingsstatus', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppfolgingsstatus));
    }),
    rest.get('/veilarboppfolging/api/oppfolging', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppfolging));
    })
];
