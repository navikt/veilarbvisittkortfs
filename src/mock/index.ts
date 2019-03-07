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
import InnstillingsHistorikk from './instillings-historikk';
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
mock.get('/veilarboppfolging/api/oppfolging', Oppfolging);
mock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', {tilgangTilBrukersKontor: true});
mock.get('/veilarboppfolging/api/oppfolging/innstillingsHistorikk', InnstillingsHistorikk);
mock.get('/veilarbperson/api/person/:fnr', Personalia);
mock.get('/veilarbportefolje/api/arbeidsliste/:fnr', Arbeidsliste);
mock.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', Veilederliste);
mock.get('/veilarbveileder/api/veileder/me', VeilederData);
mock.get('/veilarboppgave/api/enhet', [
    {enhetId: '0000', navn: 'NAV Ost'},
    {enhetId: '0001', navn: 'NAV Kjeks'},
    {enhetId: '0002', navn: 'NAV Med jætte lang navn'},

]);

mock.get('/veilarboppgave/api/oppgavehistorikk', Oppgavehistorikk);
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