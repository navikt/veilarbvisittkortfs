import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { Arbeidsliste, ArbeidslisteformValues } from '../../api/veilarbportefolje';

const mockArbeidsliste: Arbeidsliste = {
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

export const veilarbportefoljeHandlers: RequestHandlersList = [
    rest.get('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockArbeidsliste));
    }),
    rest.post('/veilarbportefolje/api/arbeidsliste/:fnr', (req, res, ctx) => {
        const requestBody = req.body as ArbeidslisteformValues;
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
        const requestBody = req.body as ArbeidslisteformValues;
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
