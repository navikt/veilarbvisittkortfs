import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { BRUK_GAMMEL_ARBEIDSREGISTRERING_URL, OboUnleashFeatures } from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';

const mockFeatures: OboUnleashFeatures = {
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: true
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
    rest.get('obo-unleash/api/feature', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockFeatures));
    })
];
