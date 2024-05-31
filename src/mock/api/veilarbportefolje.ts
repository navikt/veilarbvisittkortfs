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

const mockTomArbeidslisteMedFargekategori: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: null,
    frist: null,
    harVeilederTilgang: false,
    isOppfolgendeVeileder: false,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    kategori: KategoriModell.GUL
};

const mockHuskelapp: Huskelapp = {
    huskelappId: 'e4c54511-7668-4b89-9436-9acfd85071ff',
    kommentar:
        'Husk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møtereferat Husk å ringe legen asap og noter det i møterefe',
    frist: null,
    //frist: new Date(2024, 4, 24),
    endretAv: 'Z12347',
    endretDato: new Date()
};

export const veilarbportefoljeHandlers: RequestHandler[] = [
    http.post('/veilarbportefolje/api/v2/hent-arbeidsliste', async () => {
        await delay(defaultNetworkResponseDelay);
        const harMigrertArbeidsliste = Math.random() < 0.5;
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
    http.delete('/veilarbportefolje/api/v2/arbeidsliste', async ({ request }) => {
        const url = new URL(request.url);
        const slettFargekategori = url.searchParams.get('slettFargekategori');
        await delay(defaultNetworkResponseDelay);

        if (slettFargekategori === 'false') {
            return HttpResponse.json(mockTomArbeidslisteMedFargekategori);
        }
        return HttpResponse.json(mockTomArbeidsliste);
    }),
    http.post('/veilarbportefolje/api/v1/hent-huskelapp-for-bruker', async () => {
        await delay(defaultNetworkResponseDelay);
        const harMigrertArbeidsliste = Math.random() < 0.5;
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
    })
];
