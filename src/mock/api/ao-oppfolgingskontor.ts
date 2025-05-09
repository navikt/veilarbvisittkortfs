import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';
import { mockEnheter } from './veilarboppgave';

const baseUrl = '/ao-oppfolgingskontor';

export const settOppfolgingskontor: RequestHandler = http.post(`${baseUrl}/api/kontor`, async () => {
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json(true);
});

export const aoOppfolgingskontorGraphql: RequestHandler = http.post(`${baseUrl}/graphql`, async () => {
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json({
        data: {
            alleKontor: mockEnheter.map(it => ({ kontorId: it.enhetId, navn: it.navn }))
        }
    });
});

export const aoOppfolgingskontorHandlers = [settOppfolgingskontor, aoOppfolgingskontorGraphql];
