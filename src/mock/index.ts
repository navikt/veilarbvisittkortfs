import Oppfolgingsstatus from './oppfolging-status';
import Oppfolging from './oppfolging';
import FetchMock, {
    HandlerArgument,
    Middleware,
    MiddlewareUtils,
    ResponseUtils
} from 'yet-another-fetch-mock';
import Personalia from './personalia';
import Arbeidsliste from './arbeidsliste';
import Veilederliste from './veiledereliste';
import VeilederData from './veiledere';
import InnstillingsHistorikk from './instillingshistorikk';
import Oppgavehistorikk from './oppgave-historikk';

const loggingMiddleware: Middleware = (request, response) => {
    // tslint:disable
    console.groupCollapsed(request.url);
    console.groupCollapsed('config');
    console.log('url', request.url);
    console.log('queryParams', request.queryParams);
    console.log('pathParams', request.pathParams);
    console.log('body', request.body);
    console.groupEnd();

    try {
        console.log('response', JSON.parse(response.body));
    } catch (e) {
        console.log('response', response);
    }

    console.groupEnd();
    // tslint:enable
    return response;
};

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(500),
        loggingMiddleware
    )
});

mock.get('/veilarboppfolging/api/person/:fnr/oppfolgingsstatus', Oppfolgingsstatus);
mock.get('/veilarbpersonflatefs/api/feature', {visittkort_innstillinger: true});
mock.get('/veilarboppfolging/api/oppfolging', Oppfolging);

mock.get('/veilarbperson/api/person/:fnr', Personalia);

mock.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', Veilederliste);
mock.get('/veilarbveileder/api/veileder/me', VeilederData);

/*--OPPFOLGING--*/
mock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', {tilgangTilBrukersKontor: true});
mock.get('/veilarboppfolging/api/oppfolging/innstillingsHistorikk', InnstillingsHistorikk);
mock.post('/veilarboppfolging/api/oppfolging/avsluttOppfolging', (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise(args.body);
});

mock.get('/veilarboppfolging/api/oppfolging/avslutningStatus', {
    avslutningStatus: {
        kanAvslutte: true,
        harTiltak: false,
        harYtelser: false,
        underOppfolging: true,
        inaktiveringsDato: null,
        underKvp: true
    },
    erIkkeArbeidssokerUtenOppfolging: false,
    erSykmeldtMedArbeidsgiver: false,
    fnr: '10108000398',
    gjeldeneEskaleringsvarsel: null,
    harSkriveTilgang: false,
    inaktivtIArena: false,
    inaktiveringsdato: null,
    kanReaktiveras: false,
    kanStarteOppfolging: false,
    manuell: true,
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
    {enhetId: '0000', navn: 'NAV Ost'},
    {enhetId: '0001', navn: 'NAV Kjeks'},
    {enhetId: '0002', navn: 'NAV Med jætte lang navn'},
    {enhetId: '1234', navn: 'NAV jepps'},

]);

mock.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', Veilederliste);
mock.post('/veilarboppgave/api/oppgave', (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({
        ID: 123,
        aktoerid: '00000012345',
        gsakID: '1234',
        opprettetAv : 'Z007',
        tema: args.body.tema,
        type: args.body.type
    });
});

mock.get('/veilarboppgave/api/oppgavehistorikk', Oppgavehistorikk);

/*--ARBEIDSLISTE--*/
mock.get('/veilarbportefolje/api/arbeidsliste/:fnr', Arbeidsliste);
mock.post(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({
        arbeidslisteAktiv: null,
        endringstidspunkt: new Date().toISOString(),
        frist: args.body.frist,
        harVeilederTilgang: true,
        isOppfolgendeVeileder: true,
        kommentar: args.body.kommentar,
        overskrift: args.body.overskrift,
        sistEndretAv: 'Z007'
        });
});

mock.put(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({
        arbeidslisteAktiv: null,
        endringstidspunkt: new Date().toISOString(),
        frist: args.body.frist,
        harVeilederTilgang: true,
        isOppfolgendeVeileder: true,
        kommentar: args.body.kommentar,
        overskrift: args.body.overskrift,
        sistEndretAv: 'Z007'
    });
});

mock.delete(`/veilarbportefolje/api/arbeidsliste/:fnr`, (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise({Arbeidsliste});
});