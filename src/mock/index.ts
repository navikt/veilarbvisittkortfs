import Oppfolgingsstatus from './oppfolging-status';
import Oppfolging from './oppfolging';
import FetchMock, { HandlerArgument, Middleware, MiddlewareUtils, ResponseUtils } from 'yet-another-fetch-mock';
import Personalia from './personalia';
import Arbeidsliste from './arbeidsliste';
import Veilederliste from './veiledereliste';
import VeilederData from './veiledere';

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
mock.get('/veilarbperson/api/person/:fnr', Personalia);
mock.get('/veilarbportefolje/api/arbeidsliste/:fnr', Arbeidsliste);
mock.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', Veilederliste);
mock.get('/veilarbveileder/api/veileder/me', VeilederData);
mock.post(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (args: HandlerArgument) => {
    return ResponseUtils.jsonPromise(Arbeidsliste); });
