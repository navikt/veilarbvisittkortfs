import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { defaultNetworkResponseDelay } from '../config';

export const veilarbvedtaksstotteHandlers: RequestHandlersList = [
    rest.post('/veilarbvedtaksstotte/api/v2/hent-harUtkast', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(true));
    }),
    rest.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(true));
    })
];
