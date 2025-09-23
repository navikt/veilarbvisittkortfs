import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';
import { alleKontorResponse } from './alleKontor';
import { ArbeidsOppfolgingKontorDTO } from '../../api/ao-oppfolgingskontor';

const baseUrl = '/ao-oppfolgingskontor';

export const settOppfolgingskontor: RequestHandler = http.post(`${baseUrl}/api/kontor`, async ({ request }) => {
    const kontorId = ((await request.json()) as ArbeidsOppfolgingKontorDTO).kontorId;
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json({
        tilKontor: { kontorId, kontorNavn: 'Nytt kontor' },
        fraKontor: { kontorId, kontorNavn: 'Gammelt Kontor' }
    });
});

export const aoOppfolgingskontorGraphql: RequestHandler = http.post(`${baseUrl}/graphql`, async () => {
    await delay(defaultNetworkResponseDelay);
    return HttpResponse.json(alleKontorResponse);
});

export const aoOppfolgingskontorHandlers = [settOppfolgingskontor, aoOppfolgingskontorGraphql];
