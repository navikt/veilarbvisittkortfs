import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { defaultNetworkResponseDelay } from '../config';

export const veilarbvedtaksstotteHandlers: RequestHandlersList = [
    rest.get('/veilarbvedtaksstotte/api/utkast/:fnr/harutkast', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(true));
    }),
    rest.get('/veilarbvedtaksstotte/api/utrulling/erUtrullet', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(true));
    })
];
