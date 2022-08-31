import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import { defaultNetworkResponseDelay } from '../config';

export const veilarbaktivitetHandlers: RequestHandlersList = [
    rest.post('/veilarbaktivitet/api/arena/harTiltak', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(true));
    })
];
