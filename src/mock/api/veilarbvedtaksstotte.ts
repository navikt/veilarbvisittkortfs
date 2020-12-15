import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';

export const veilarbvedtaksstotteHandlers: RequestHandlersList = [
    rest.get('/veilarbvedtaksstotte/api/:fnr/harutkast', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(true));
    }),
];
