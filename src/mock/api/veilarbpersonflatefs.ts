import {
    BRUK_GJELDENDE_14A_SOM_KILDE_FOR_PROFILERINGSETIKETTER,
    BRUK_GJELDENDE_14A_SOM_KILDE_FOR_TRENGER_VURDERING_ETIKETT,
    VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING,
    OboUnleashFeatures,
    VIS_I_ARBEIDSSOKERREGISTERET_ETIKETT
} from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockFeatures: OboUnleashFeatures = {
    [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING]: true,
    [BRUK_GJELDENDE_14A_SOM_KILDE_FOR_PROFILERINGSETIKETTER]: true,
    [BRUK_GJELDENDE_14A_SOM_KILDE_FOR_TRENGER_VURDERING_ETIKETT]: true,
    [VIS_I_ARBEIDSSOKERREGISTERET_ETIKETT]: true
};

export const veilarbpersonflatefsHandlers: RequestHandler[] = [
    http.get('obo-unleash/api/feature', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockFeatures);
    })
];
