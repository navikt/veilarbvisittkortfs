import Oppfolgingsstatus from './oppfolging-status';
import Oppfolging from './oppfolging';
import FetchMock, { HandlerArgument, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import Personalia from './personalia';
import Arbeidsliste from './arbeidsliste';
import Veilederliste from './veiledereliste';
import VeilederData, { enhetData } from './veiledere';
import InnstillingsHistorikk from './innstillingshistorikk';
import Oppgavehistorikk from './oppgave-historikk';
import Henvendelse from './henvedelse';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware()),
});

mock.get('/veilarboppfolging/api/person/:fnr/oppfolgingsstatus', Oppfolgingsstatus);
mock.get('/veilarbpersonflatefs/api/feature', { 'veilarbvedtaksstottefs.prelansering': true });
mock.get('/veilarboppfolging/api/oppfolging', Oppfolging);

mock.get('/veilarbperson/api/person/:fnr', Personalia);
mock.get('/veilarbvedtaksstotte/api/:fnr/harutkast', true);

mock.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', Veilederliste);
mock.get('/veilarbveileder/api/enhet/:enhetId/navn', enhetData);
mock.get('/veilarbveileder/api/veileder/me', VeilederData);

mock.post('/veilarboppfolging/api/oppfolging/stoppEskalering/', (args: HandlerArgument) => {
    Oppfolging.gjeldendeEskaleringsvarsel = null;
    return {};
});

mock.post('/veilarboppfolging/api/tilordneveileder', { feilendeTilordninger: [] });
//mock.post('/veilarboppfolging/api/tilordneveileder', feilResultat);

/*--OPPFOLGING--*/
mock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', { tilgangTilBrukersKontor: true });
mock.get('/veilarboppfolging/api/oppfolging/innstillingsHistorikk', InnstillingsHistorikk);
mock.post('/veilarboppfolging/api/oppfolging/startEskalering/', ResponseUtils.statusCode(204));
mock.post('/veilarboppfolging/api/oppfolging/avsluttOppfolging', (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise(args.body);
});

mock.post('/veilarboppfolging/api/oppfolging/settManuell', Object.assign({}, Oppfolging, { manuell: true }));

mock.get('/veilarboppfolging/api/oppfolging/avslutningStatus', {
    avslutningStatus: {
        kanAvslutte: false,
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
});
mock.post('/veilarboppfolging/api/oppfolging/startKvp', {});

/*--OPPGAVE--*/
mock.get('/veilarboppgave/api/enheter', [
    { enhetId: '0000', navn: 'NAV Ost' },
    { enhetId: '0001', navn: 'NAV Kjeks' },
    { enhetId: '0002', navn: 'NAV Med jætte lang navn' },
    { enhetId: '1234', navn: 'NAV jepps' },
]);

mock.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', Veilederliste);
mock.post('/veilarboppgave/api/oppgave', (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({
        ID: 123,
        aktoerid: '00000012345',
        gsakID: '1234',
        opprettetAv: 'Z007',
        tema: args.body.tema,
        type: args.body.type,
    });
});

mock.post('/veilarbdialog/api/dialog', Henvendelse);
mock.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/true', Henvendelse);
mock.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/true', Henvendelse);

mock.get('/veilarboppgave/api/oppgavehistorikk', Oppgavehistorikk);

/*--ARBEIDSLISTE--*/
mock.get('/veilarbportefolje/api/arbeidsliste/:fnr', Arbeidsliste);
mock.post(
    `/veilarbportefolje/api/arbeidsliste/:fnr?`,
    ResponseUtils.delayed(450, (args: HandlerArgument) =>
        ResponseUtils.jsonPromise({
            arbeidslisteAktiv: null,
            endringstidspunkt: new Date().toISOString(),
            frist: args.body.frist,
            harVeilederTilgang: true,
            isOppfolgendeVeileder: true,
            kommentar: args.body.kommentar,
            overskrift: args.body.overskrift,
            sistEndretAv: 'Z007',
            kategori: args.body.kategori,
        })
    )
);

mock.put(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({
        arbeidslisteAktiv: null,
        endringstidspunkt: new Date().toISOString(),
        frist: args.body.frist,
        harVeilederTilgang: true,
        isOppfolgendeVeileder: true,
        kommentar: args.body.kommentar,
        overskrift: args.body.overskrift,
        sistEndretAv: 'Z007',
        kategori: args.body.kategori,
    });
});

mock.delete(`/veilarbportefolje/api/arbeidsliste/:fnr`, (_: HandlerArgument) =>
    ResponseUtils.jsonPromise({ Arbeidsliste })
);
