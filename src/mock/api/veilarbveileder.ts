import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { mockEnhetVeiledere } from './common-data';
import { EnhetData, VeilederData } from '../../api/veilarbveileder';

const mockEnhetData: EnhetData = {
    enhetId: '1337',
    navn: 'NAV Leeten',
};

export const mockInnloggetVeileder: VeilederData = {
    ident: 'Z007',
    navn: 'James Bond',
    fornavn: 'James',
    etternavn: 'Bond',
};

export const veilarbveilederHandlers: RequestHandlersList = [
    rest.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnhetVeiledere));
    }),
    rest.get('/veilarbveileder/api/enhet/:enhetId/navn', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockEnhetData));
    }),
    rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(mockInnloggetVeileder));
    }),
];
