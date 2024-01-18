import { Arbeidsliste, ArbeidslisteformValues, Huskelapp, KategoriModell } from '../../api/veilarbportefolje';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockArbeidsliste: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: new Date(),
    frist: new Date(),
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    overskrift: 'Her er tittelen daa!',
    sistEndretAv: { veilederId: 'Z12347' },
    kategori: KategoriModell.GRONN
};

const mockTomArbeidsliste: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: null,
    frist: null,
    harVeilederTilgang: false,
    isOppfolgendeVeileder: false,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    kategori: null
};

const mockHuskelapp: Huskelapp = {
    huskelappId: 'e4c54511-7668-4b89-9436-9acfd85071ff',
    kommentar: 'Husk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møterefera',
    frist: null,
    //frist: new Date(2024, 4, 24),
    endretAv: 'Z12347',
    endretDato: new Date()
};

var harMigrertArbeidsliste = Math.random() < 0.5;

export const veilarbportefoljeHandlers: RequestHandler[] = [
    http.post('/veilarbportefolje/api/v2/hent-arbeidsliste', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(harMigrertArbeidsliste ? mockTomArbeidsliste : mockArbeidsliste);
    }),
    http.post('/veilarbportefolje/api/v2/arbeidsliste', async ({ request }) => {
        const requestBody = (await request.json()) as ArbeidslisteformValues;
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({
            arbeidslisteAktiv: null,
            endringstidspunkt: new Date().toISOString(),
            frist: requestBody.frist,
            harVeilederTilgang: true,
            isOppfolgendeVeileder: true,
            kommentar: requestBody.kommentar,
            overskrift: requestBody.overskrift,
            sistEndretAv: 'Z000007',
            kategori: requestBody.kategori
        });
    }),
    http.put('/veilarbportefolje/api/v2/arbeidsliste', async ({ request }) => {
        const requestBody = (await request.json()) as ArbeidslisteformValues;
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({
            arbeidslisteAktiv: null,
            endringstidspunkt: new Date().toISOString(),
            frist: requestBody.frist,
            harVeilederTilgang: true,
            isOppfolgendeVeileder: true,
            kommentar: requestBody.kommentar,
            overskrift: requestBody.overskrift,
            sistEndretAv: 'Z000007',
            kategori: requestBody.kategori
        });
    }),
    http.delete('/veilarbportefolje/api/v2/arbeidsliste', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockArbeidsliste);
    }),
    http.post('/veilarbportefolje/api/v1/hent-huskelapp-for-bruker', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(harMigrertArbeidsliste ? mockHuskelapp : {});
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
    })
];
