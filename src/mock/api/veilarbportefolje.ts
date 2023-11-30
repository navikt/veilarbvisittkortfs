import { Arbeidsliste, ArbeidslisteformValues, KategoriModell } from '../../api/veilarbportefolje';
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
    sistEndretAv: { veilederId: 'Z123456' },
    kategori: KategoriModell.GRONN
};

export const veilarbportefoljeHandlers: RequestHandler[] = [
    http.post('/veilarbportefolje/api/v2/hent-arbeidsliste', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockArbeidsliste);
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
    http.delete('/veilarbportefolje/api/arbeidsliste', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockArbeidsliste);
    })
];
