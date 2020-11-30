import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { Features } from '../../api/veilarbpersonflatefs';

const mockFeatures: Features = {
    'pto.vedtaksstotte.pilot': true,
    'veilarbvedtaksstottefs.prelansering': true,
};

export const veilarbpersonflatefsHandlers: RequestHandlersList = [
    rest.get('/veilarbpersonflatefs/api/feature', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockFeatures));
    }),
];
