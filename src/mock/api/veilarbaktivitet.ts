import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';

export const veilarbaktivitetHandlers: RequestHandler[] = [
    http.post('/veilarbaktivitet/api/arena/harTiltak', async () => {
        await delay(defaultNetworkResponseDelay);

        return HttpResponse.json(true);
    })
];
