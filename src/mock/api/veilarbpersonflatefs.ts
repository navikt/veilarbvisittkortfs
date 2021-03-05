import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { FeatureToggles } from '../../api/veilarbpersonflatefs';

const mockFeatures: FeatureToggles = {
    'pto.vedtaksstotte.pilot': true,
    'veilarbvedtaksstottefs.prelansering': true,
    'vis.pto.persondata.fra.pdl': true,
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
    rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockFeatures));
    }),
];
