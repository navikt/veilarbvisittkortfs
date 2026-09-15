import {
    OboUnleashFeatures,
    DARKMODE_VISITTKORT_TOGGLE,
    EKSEMPELTOGGLE,
    UTMELDINGSKANDIDATER_TOGGLE
} from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockFeatures: OboUnleashFeatures = {
    [EKSEMPELTOGGLE]: true,
    [DARKMODE_VISITTKORT_TOGGLE]: true,
    [UTMELDINGSKANDIDATER_TOGGLE]: true
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockFeatures);
    })
];
