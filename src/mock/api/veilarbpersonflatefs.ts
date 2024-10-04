import {
    BRUK_GAMMEL_ARBEIDSREGISTRERING_URL,
    BRUK_NY_KILDE_TIL_FULLMAKT,
    HUSKELAPP,
    OboUnleashFeatures,
    SKJUL_ARBEIDSLISTEFUNKSJONALITET
} from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockFeatures: OboUnleashFeatures = {
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: true,
    [HUSKELAPP]: true,
    [BRUK_NY_KILDE_TIL_FULLMAKT]: true,
    [SKJUL_ARBEIDSLISTEFUNKSJONALITET]: false
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockFeatures);
    })
];
