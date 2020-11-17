import Oppfolgingsstatus from './oppfolging-status';
import Oppfolging from './oppfolging';
import FetchMock, {
    MiddlewareUtils,
    MockContext,
    HandlerResponseElement,
    MockRequest,
    MockResponse,
    MockHandler,
} from 'yet-another-fetch-mock';
import Personalia from './personalia';
import Arbeidsliste from './arbeidsliste';
import Veilederliste from './veiledereliste';
import VeilederData, { enhetData } from './veiledere';
import InnstillingsHistorikk from './innstillingshistorikk';
import Oppgavehistorikk from './oppgave-historikk';
import Henvendelse from './henvedelse';
import { avslutningsstatus } from './avslutningsstatus';
import { harBruktNivaa4 } from './har-brukt-nivaa4';

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(MiddlewareUtils.delayMiddleware(500), MiddlewareUtils.loggingMiddleware()),
});

export const internalServerError = (ctx: MockContext): Array<HandlerResponseElement> => [
    ctx.status(500),
    ctx.statusText('Internal server error'),
    ctx.json({
        id: '9170c6534ed5eca272d527cd30c6a458',
        type: 'UKJENT',
        detaljer: {
            detaljertType: 'javax.ws.rs.InternalServerErrorException',
            feilMelding: 'HTTP 500 Internal Server Error',
            stackTrace: 'javax.ws.rs.InternalServerErrorException: HTTP 500 Internal Server Error\r\n\t',
        },
    }),
];

const jsonResponse = (response: any): MockHandler => (req: MockRequest, res: MockResponse, ctx: MockContext) =>
    res(ctx.json(response));

mock.get('/veilarboppfolging/api/person/:fnr/oppfolgingsstatus', jsonResponse(Oppfolgingsstatus));
mock.get('/veilarbperson/api/person/:fnr/harNivaa4', jsonResponse(harBruktNivaa4));

mock.get('/veilarbpersonflatefs/api/feature', jsonResponse({ 'veilarbvedtaksstottefs.prelansering': true }));
mock.get('/veilarboppfolging/api/oppfolging', jsonResponse(Oppfolging));

mock.get('/veilarbperson/api/person/:fnr', jsonResponse(Personalia));
mock.get('/veilarbvedtaksstotte/api/:fnr/harutkast', jsonResponse(true));

mock.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', jsonResponse(Veilederliste));
mock.get('/veilarbveileder/api/enhet/:enhetId/navn', jsonResponse(enhetData));
mock.get('/veilarbveileder/api/veileder/me', jsonResponse(VeilederData));

mock.post(
    '/veilarboppfolging/api/oppfolging/stoppEskalering/',
    jsonResponse(() => {
        Oppfolging.gjeldendeEskaleringsvarsel = null;
        return {};
    })
);

mock.post('/veilarboppfolging/api/tilordneveileder', jsonResponse({ feilendeTilordninger: [] }));
//mock.post('/veilarboppfolging/api/tilordneveileder', feilResultat);

/*--OPPFOLGING--*/
mock.get('/veilarboppfolging/api/oppfolging/veilederTilgang', jsonResponse({ tilgangTilBrukersKontor: true }));
mock.get('/veilarboppfolging/api/oppfolging/innstillingsHistorikk', jsonResponse(InnstillingsHistorikk));
mock.post(
    '/veilarboppfolging/api/oppfolging/startEskalering/',
    (req: MockRequest, res: MockResponse, ctx: MockContext) => res(ctx.status(204))
);
mock.post(
    '/veilarboppfolging/api/oppfolging/avsluttOppfolging',
    jsonResponse({ ...avslutningsstatus, underOppfolging: false })
);
mock.get('/veilarboppfolging/api/oppfolging/avslutningStatus', jsonResponse(avslutningsstatus));

mock.post('/veilarboppfolging/api/oppfolging/settManuell', jsonResponse({ ...Oppfolging, manuell: true }));

mock.post('/veilarboppfolging/api/oppfolging/startKvp', jsonResponse({}));

/*--AKTIVITET--*/
mock.get('/veilarbaktivitet/api/aktivitet/harTiltak', jsonResponse(true));

/*--OPPGAVE--*/
mock.get(
    '/veilarboppgave/api/enheter',
    jsonResponse([
        { enhetId: '0000', navn: 'NAV Ost' },
        { enhetId: '0001', navn: 'NAV Kjeks' },
        { enhetId: '0002', navn: 'NAV Med jætte lang navn' },
        { enhetId: '1234', navn: 'NAV jepps' },
    ])
);

mock.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', jsonResponse(Veilederliste));
mock.post('/veilarboppgave/api/oppgave', (req, res, ctx) =>
    res(
        ctx.json({
            ID: 123,
            aktoerid: '00000012345',
            gsakID: '1234',
            opprettetAv: 'Z007',
            tema: req.body.tema,
            type: req.body.type,
        })
    )
);

mock.post('/veilarbdialog/api/dialog', jsonResponse(Henvendelse));
mock.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/true', jsonResponse(Henvendelse));
mock.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/true', jsonResponse(Henvendelse));

mock.get('/veilarboppgave/api/oppgavehistorikk', jsonResponse(Oppgavehistorikk));

/*--ARBEIDSLISTE--*/
mock.get('/veilarbportefolje/api/arbeidsliste/:fnr', jsonResponse(Arbeidsliste));
mock.post(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (req, res, ctx) =>
    res(
        ctx.json({
            arbeidslisteAktiv: null,
            endringstidspunkt: new Date().toISOString(),
            frist: req.body.frist,
            harVeilederTilgang: true,
            isOppfolgendeVeileder: true,
            kommentar: req.body.kommentar,
            overskrift: req.body.overskrift,
            sistEndretAv: 'Z007',
            kategori: req.body.kategori,
        })
    )
);

mock.put(`/veilarbportefolje/api/arbeidsliste/:fnr?`, (req, res, ctx) =>
    res(
        ctx.json({
            arbeidslisteAktiv: null,
            endringstidspunkt: new Date().toISOString(),
            frist: req.body.frist,
            harVeilederTilgang: true,
            isOppfolgendeVeileder: true,
            kommentar: req.body.kommentar,
            overskrift: req.body.overskrift,
            sistEndretAv: 'Z007',
            kategori: req.body.kategori,
        })
    )
);

mock.delete(`/veilarbportefolje/api/arbeidsliste/:fnr`, jsonResponse({ Arbeidsliste }));
