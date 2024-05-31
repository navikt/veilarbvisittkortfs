import {
    EskaleringsvarselHistorikkInnslag,
    GjeldendeEskaleringsvarsel,
    veilarbDialogGraphqlEndpoint
} from '../../api/veilarbdialog';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

export const veilarbdialogHandlers: RequestHandler[] = [
    http.post(veilarbDialogGraphqlEndpoint, async ({ request }) => {
        const body = (await request.json()) as { query: string };
        await delay(defaultNetworkResponseDelay);
        if (body.query.includes('stansVarselHistorikk')) {
            const now = new Date();
            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            const eskaleringsvarsel: EskaleringsvarselHistorikkInnslag = {
                id: 1,
                tilhorendeDialogId: 42,
                opprettetAv: 'Z123456',
                opprettetDato: yesterday.toISOString(),
                opprettetBegrunnelse: 'Begrunnelse for start av eskalering',
                avsluttetDato: now.toISOString(),
                avsluttetAv: 'Z123456',
                avsluttetBegrunnelse: 'Begrunnelse for stopp av eskalering'
            };
            return HttpResponse.json({ data: { stansVarselHistorikk: [eskaleringsvarsel] } });
        } else if (body.query.includes('stansVarsel')) {
            const gjeldendeEskaleringsvarsel: GjeldendeEskaleringsvarsel = {
                id: 1,
                tilhorendeDialogId: 42,
                opprettetAv: 'Z123456',
                opprettetDato: new Date().toISOString(),
                opprettetBegrunnelse: 'begrunnelse'
            };
            return HttpResponse.json({ data: { stansVarsel: gjeldendeEskaleringsvarsel } });
        } else {
            return HttpResponse.json({ data: { dialoger: [] } });
        }
    }),
    http.post('/veilarbdialog/api/eskaleringsvarsel/start', async () => {
        await delay(defaultNetworkResponseDelay);

        return new HttpResponse(null, { status: 200 });
    }),
    http.patch('/veilarbdialog/api/eskaleringsvarsel/stop', async () => {
        await delay(defaultNetworkResponseDelay);

        return new HttpResponse(null, { status: 200 });
    })
];
