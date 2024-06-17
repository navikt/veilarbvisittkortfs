import {
    BRUK_GAMMEL_ARBEIDSREGISTRERING_URL,
    HUSKELAPP,
    OboUnleashFeatures,
    REPRFULLMAKT
} from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockFeatures: OboUnleashFeatures = {
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: true,
    [HUSKELAPP]: false,
    [REPRFULLMAKT]: true
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockFeatures);
    })
];
