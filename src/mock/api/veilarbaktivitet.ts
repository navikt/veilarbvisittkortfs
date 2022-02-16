import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';

export const veilarbaktivitetHandlers: RequestHandlersList = [
    rest.post('/veilarbaktivitet/api/arena/harTiltak', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(true));
    })
];
