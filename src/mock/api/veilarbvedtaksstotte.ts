import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post('/veilarbvedtaksstotte/api/v2/hent-harUtkast', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(true);
    })
];
