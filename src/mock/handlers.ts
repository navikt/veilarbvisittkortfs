import { rest } from 'msw';
import {
    mockEnhetData,
    mockEnhetVeiledere,
    mockHarBruktNivaa4,
    mockOppfolging,
    mockOppfolgingsstatus,
    mockPersonalia,
    mockInnloggetVeileder,
    mockInnstillingsHistorikk,
    mockAvslutningStatus,
    mockEnheter,
    mockHenvendelseData,
    mockOppgavehistorikk,
    mockArbeidsliste,
    mockRegistrering,
} from './data';

export const handlers = [
    rest.get('/veilarbregistrering/api/registrering', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockRegistrering));
    }),
    rest.get('/veilarboppfolging/api/person/:fnr/oppfolgingsstatus', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppfolgingsstatus));
    }),
    rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json({ 'veilarbvedtaksstottefs.prelansering': true }));
    }),
    rest.get('/veilarboppfolging/api/oppfolging', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppfolging));
    }),
    rest.get('/veilarbperson/api/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonalia));
    }),
    rest.get('/veilarbperson/api/person/:fnr/harNivaa4', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHarBruktNivaa4));
    }),
    rest.get('/veilarbperson/api/person/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockPersonalia));
    }),
    rest.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnhetVeiledere));
    }),
    rest.get('/veilarbveileder/api/enhet/:enhetId/navn', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnhetData));
    }),
    rest.get('/veilarbvedtaksstotte/api/:fnr/harutkast', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(true));
    }),
    rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockInnloggetVeileder));
    }),
    rest.post('/veilarboppfolging/api/oppfolging/stoppEskalering/', (req, res, ctx) => {
        mockOppfolging.gjeldendeEskaleringsvarsel = null;
        return res(ctx.delay(500), ctx.json({}));
    }),
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
        return res(ctx.delay(500), ctx.json({})); // TODO: Might be wrong (return ResponseUtils.jsonPromise(args.body);)
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
    rest.get('/veilarboppgave/api/enheter', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnheter));
    }),
    rest.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnhetVeiledere));
    }),
    rest.post('/veilarboppgave/api/oppgave', (req, res, ctx) => {
        const requestBody = req.body as any; // TODO: Might need to be parsed to json

        return res(
            ctx.delay(500),
            ctx.json({
                ID: 123,
                aktoerid: '00000012345',
                gsakID: '1234',
                opprettetAv: 'Z007',
                tema: requestBody.tema,
                type: requestBody.type,
            })
        );
    }),
    rest.post('/veilarbdialog/api/dialog', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHenvendelseData));
    }),
    rest.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/true', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHenvendelseData));
    }),
    rest.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/true', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockHenvendelseData));
    }),
    rest.get('/veilarboppgave/api/oppgavehistorikk', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockOppgavehistorikk));
    }),
    rest.get('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockArbeidsliste));
    }),
    rest.post('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        const requestBody = req.body as any; // TODO: Might need to be parsed to json

        return res(
            ctx.delay(500),
            ctx.json({
                arbeidslisteAktiv: null,
                endringstidspunkt: new Date().toISOString(),
                frist: requestBody.frist,
                harVeilederTilgang: true,
                isOppfolgendeVeileder: true,
                kommentar: requestBody.kommentar,
                overskrift: requestBody.overskrift,
                sistEndretAv: 'Z007',
                kategori: requestBody.kategori,
            })
        );
    }),
    rest.put('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        const requestBody = req.body as any; // TODO: Might need to be parsed to json

        return res(
            ctx.delay(500),
            ctx.json({
                arbeidslisteAktiv: null,
                endringstidspunkt: new Date().toISOString(),
                frist: requestBody.frist,
                harVeilederTilgang: true,
                isOppfolgendeVeileder: true,
                kommentar: requestBody.kommentar,
                overskrift: requestBody.overskrift,
                sistEndretAv: 'Z007',
                kategori: requestBody.kategori,
            })
        );
    }),
    rest.delete('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockArbeidsliste));
    }),
];
