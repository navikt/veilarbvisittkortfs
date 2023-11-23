import { Arbeidsliste, ArbeidslisteformValues, KategoriModell } from '../../api/veilarbportefolje';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockArbeidsliste: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: new Date(),
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: null,
    overskrift: null,
    sistEndretAv: {veilederId: "Z123456"},
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
