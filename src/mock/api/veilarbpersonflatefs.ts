import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { FeatureToggles, PILOT_TOGGLE, VEILARBDETALJERFS_ENABLED } from '../../api/veilarbpersonflatefs';
import { defaultNetworkResponseDelay } from '../config';

const mockFeatures: FeatureToggles = {
    [PILOT_TOGGLE]: true,
    [VEILARBDETALJERFS_ENABLED]: true
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
    rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockFeatures));
    })
];
