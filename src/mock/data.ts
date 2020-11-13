import { Arbeidsliste } from '../api/data/arbeidsliste';
import { HarBruktNivaa4Type } from '../api/data/har-brukt-nivaa4';
import { InnstillingsHistorikk } from '../api/data/innstillings-historikk';
import { Oppfolging } from '../api/data/oppfolging';
import { OppfolgingStatus } from '../api/data/oppfolging-status';
import { OppgaveHistorikk } from '../api/data/oppgave-historikk';
import { Personalia } from '../api/data/personalia';
import { VeilederData, VeilederListe } from '../api/data/veilederdata';
import { EnhetData } from '../api/data/enhet';
import { RegistreringData } from '../api/registrering-api';

export const mockArbeidsliste: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: null,
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    kategori: null,
};

export const mockAvslutningStatus = {
    avslutningStatus: {
        kanAvslutte: true,
        harTiltak: false,
        harYtelser: false,
        underOppfolging: true,
        inaktiveringsDato: null,
        underKvp: false,
    },
    erIkkeArbeidssokerUtenOppfolging: false,
    erSykmeldtMedArbeidsgiver: false,
    fnr: '10108000398',
    gjeldendeEskaleringsvarsel: null,
    harSkriveTilgang: false,
    inaktivtIArena: true,
    inaktiveringsdato: null,
    kanReaktiveras: false,
    kanStarteOppfolging: false,
    manuell: false,
    oppfolgingUtgang: null,
    oppfolgingsPerioder: [],
    reservarsjonKRR: true,
    underKvp: false,
    underOppfolging: true,
    veilederId: null,
    vilkarMaBesvarel: false,
};

export const mockEnheter = [
    { enhetId: '0000', navn: 'NAV Ost' },
    { enhetId: '0001', navn: 'NAV Kjeks' },
    { enhetId: '0002', navn: 'NAV Med jætte lang navn' },
    { enhetId: '1234', navn: 'NAV jepps' },
];

export const mockHarBruktNivaa4: HarBruktNivaa4Type = {
    harbruktnivaa4: false,
};

export const mockHenvendelseData: any = {
    aktivitetId: null,
    egenskaper: ['ESKALERINGSVARSEL'],
    erLestAvBruker: false,
    ferdigBehandlet: true,
    henvendelser: [
        {
            avsender: 'VEILEDER',
            avsenderId: 'Z1234',
            dialogId: '1665',
            id: '2201',
            lest: true,
            sendt: '2019-04-04T13:34:51.086+02:00',
            tekst:
                'Generell innledningstekst:Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.',
        },
    ],
    historisk: false,
    id: '1665',
    lest: true,
    lestAvBrukerTidspunkt: null,
    opprettetDato: '2019-04-04T13:34:51.057+02:00',
    overskrift: 'Du har fått et varsel fra NAV',
    sisteDato: '2019-04-04T13:34:51.086+02:00',
    sisteTekst:
        'Generell innledningstekst:Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.',
    venterPaSvar: false,
};

export const mockInnstillingsHistorikk: InnstillingsHistorikk[] = [
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-08-14T13:56:53.813+02:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
    },
    {
        type: 'VEILEDER_TILORDNET',
        dato: '2019-08-14T13:56:53.813+02:00',
        begrunnelse: 'Brukeren er tildelt veileder Z0002',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: null,
        dialogId: null,
    },
    {
        type: 'OPPFOLGINGSENHET_ENDRET',
        dato: '2019-09-30T12:23:48.116+01:00',
        begrunnelse: 'Ny oppfølgingsenhet 1337',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
        enhet: '1337',
    },
    {
        type: 'OPPFOLGINGSENHET_ENDRET',
        dato: '2016-09-30T12:23:48.116+01:00',
        begrunnelse: 'Ny oppfølgingsenhet 1234',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
        enhet: '1234',
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-10-30T12:23:48.116+01:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2018-09-03T13:17:41.325+02:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'SYSTEM',
        opprettetAvBrukerId: null,
        dialogId: null,
    },
    {
        type: 'AVSLUTTET_OPPFOLGINGSPERIODE',
        dato: '2019-01-28T09:30:23.76+01:00',
        begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: null,
        dialogId: null,
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T12:45:09.571+01:00',
        begrunnelse: 'TEST AV OPPGAVE (TONE)',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990279',
        dialogId: 1412,
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-07T15:11:41.997+01:00',
        begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990279',
        dialogId: 1412,
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T18:04:50.498+01:00',
        begrunnelse: 'Test varsel om oppgave i aktivitetsplan 7/3 kl 1804',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1415,
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-27T09:32:51.748+01:00',
        begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.\nasdfasdfasdfasdfsadfasdf',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990781',
        dialogId: 1415,
    },
    {
        type: 'ESKALERING_STARTET',
        dato: '2019-03-07T15:11:54.465+01:00',
        begrunnelse: 'TEst ',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1413,
    },
    {
        type: 'ESKALERING_STOPPET',
        dato: '2019-03-07T18:04:06.707+01:00',
        begrunnelse: null,
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'z990279',
        dialogId: 1413,
    },
];

export const mockOppfolging: Oppfolging = {
    fnr: '123456',
    veilederId: 'Z007',
    reservasjonKRR: false,
    manuell: false,
    underOppfolging: true,
    underKvp: false,
    oppfolgingUtgang: '2019-03-28T11:12:40.973+01:00',
    gjeldendeEskaleringsvarsel: null,
    /*gjeldendeEskaleringsvarsel: {
        varselId: '1',
        aktorId: '112345',
        oppretterAv: 'Z9091',
        opprettetDato: '2019-03-28T11:12:40.973+01:00',
        avsluttetDato: null,
        tilhorendeDialogId: '1'
    },*/
    kanStarteOppfolging: false,
    avslutningStatus: null,
    oppfolgingsPerioder: [
        {
            aktorId: '00007',
            veileder: null,
            startDato: '2017-12-02T18:37:24.717+01:00',
            sluttDato: '2019-03-28T11:12:40.973+01:00',
            begrunnelse: 'Oppfølging avsluttet automatisk pga. inaktiv bruker som ikke kan reaktiveres',
            kvpPerioder: [],
        },
    ],
    harSkriveTilgang: true,
    inaktivIArena: true,
    kanReaktiveres: false,
    inaktiveringsdato: '2019-02-22T00:00:00+01:00',
    erSykmeldtMedArbeidsgiver: false,
    erIkkeArbeidssokerUtenOppfolging: false,
    kanVarsles: true,
};

export const mockOppfolgingsstatus: OppfolgingStatus = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007',
    },
    veilederId: '',
    formidlingsgruppe: 'ARBS',
    servicegruppe: 'BKART',
};

export const mockOppgavehistorikk: OppgaveHistorikk[] = [
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z995009',
        dato: '2018-01-31T15:17:46.872+01:00',
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:40:52.445+02:00',
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'DAGPENGER',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:43:19.348+02:00',
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'INDIVIDSTONAD',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:46:34.778+02:00',
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990582',
        dato: '2018-01-16T14:11:13.891+01:00',
    },
];

export const mockPersonalia: Personalia = {
    fornavn: 'BRUCE BRUCE',
    mellomnavn: 'BATTY BATTY',
    etternavn: 'WAYNE',
    sammensattNavn: 'Bruce Batty Wayne',
    fodselsnummer: '10108000398',
    fodselsdato: '1974-09-16',
    dodsdato: null,
    diskresjonskode: null,
    sikkerhetstiltak: 'To ansatte i samtale',
    egenAnsatt: false,
    kjonn: 'K',
};

export const mockFeilResultat = {
    resultat: 'WARNING: Noen brukere kunne ikke tilordnes en veileder',
    feilendeTilordninger: [
        {
            brukerFnr: '123534546',
            aktoerId: '10000356543',
            innloggetVeilederId: 'BLABLA',
            fraVeilederId: 'BLABLA1',
            tilVeilederId: 'BLABLA',
        },
    ],
};

export const mockInnloggetVeileder: VeilederData = {
    ident: 'Z007',
    navn: 'James Bond',
    fornavn: 'James',
    etternavn: 'Bond',
};

export const mockEnhetData: EnhetData = {
    enhetId: '1337',
    navn: 'NAV Leeten',
};

export const mockRegistrering: RegistreringData = {
    type: 'ORDINAER',
    registrering: {
        manueltRegistrertAv: null,
    },
};

function lagVeileder(): VeilederData {
    const fornavn = 'Herpsderps';
    const etternavn = 'Apabepa';

    const id = 'Z' + (Math.floor(Math.random() * 1000000) + 100000);

    return {
        ident: id,
        navn: fornavn + ' ' + etternavn,
        fornavn: fornavn,
        etternavn: etternavn,
    };
}

export const mockEnhetVeiledere: VeilederListe = { veilederListe: new Array(40).fill(0).map(() => lagVeileder()) };
