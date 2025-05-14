import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';
import { alleKontorResponse } from './alleKontor';

const baseUrl = '/ao-oppfolgingskontor';

export const settOppfolgingskontor: RequestHandler = http.post(`${baseUrl}/api/kontor`, async () => {
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json(true);
});

export const aoOppfolgingskontorGraphql: RequestHandler = http.post(`${baseUrl}/graphql`, async () => {
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json(alleKontorResponse);
});

export const aoOppfolgingskontorHandlers = [settOppfolgingskontor, aoOppfolgingskontorGraphql];
