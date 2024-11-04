import { Huskelapp } from '../../api/veilarbportefolje';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockHuskelapp: Huskelapp = {
    huskelappId: 'e4c54511-7668-4b89-9436-9acfd85071ff',
    kommentar:
        'Husk å ringe legen asap og noter det i møtereferat\n\n\nHusk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møtere',
    frist: null,
    //frist: new Date(2024, 4, 24),
    endretAv: 'Z12347',
    endretDato: new Date(),
    enhetId: '1234'
};

export const veilarbportefoljeHandlers: RequestHandler[] = [
    http.post('/veilarbportefolje/api/v1/hent-huskelapp-for-bruker', async () => {
        await delay(defaultNetworkResponseDelay);
        const harHuskelapp = Math.random() < 0.5;
        return HttpResponse.json(harHuskelapp ? mockHuskelapp : {});
    }),
    http.post('/veilarbportefolje/api/v1/huskelapp', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockHuskelapp);
    }),
    http.put('/veilarbportefolje/api/v1/huskelapp', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockHuskelapp);
    }),
    http.delete('/veilarbportefolje/api/v1/huskelapp', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json();
    }),
    http.post('/veilarbportefolje/api/v1/hent-fargekategori', async ({ request }) => {
        const requestBody = (await request.json()) as { fnr: string };
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({
            id: 'uu-1-d',
            fnr: requestBody.fnr,
            fargekategoriVerdi: 'FARGEKATEGORI_C',
            sistEndret: new Date().toISOString(),
            endretAv: { veilederId: 'Z12345' }
        });
    }),
    http.put('/veilarbportefolje/api/v1/fargekategorier', async ({ request }) => {
        const requestBody = (await request.json()) as { fargekategoriVerdi: string; fnr: string[] };
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({
            data: [requestBody.fnr],
            errors: [],
            fargekategoriVerdi: requestBody.fargekategoriVerdi
        });
    }),
    http.post(`/veilarbportefolje/api/v1/hent-er-bruker-ufordelt`, async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(false);
    })
];
