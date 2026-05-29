import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';

export const veilarbaktivitetHandlers: RequestHandler[] = [
    http.post('/veilarbaktivitet/api/arena/harTiltak', async () => {
        await delay(defaultNetworkResponseDelay);

        return HttpResponse.json(true);
    }),
    http.get('/veilarbaktivitet/api/feature', async () => {
        await delay(defaultNetworkResponseDelay);

        return HttpResponse.json({
            bruk_ao_kontor_som_master: true
        });
    })
];
