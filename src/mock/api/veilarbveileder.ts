import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { mockEnhetVeiledere } from './common-data';
import { EnhetData, VeilederData, VeilederDataListeRequest } from '../../api/veilarbveileder';
import { defaultNetworkResponseDelay } from '../config';

const mockEnhetData: EnhetData = {
    enhetId: '1337',
    navn: 'NAV Leeten'
};

export const mockInnloggetVeileder: VeilederData = {
    ident: 'Z000007',
    navn: 'James Bond',
    fornavn: 'James',
    etternavn: 'Bond'
};

const mockVeiledereNavn = (veiledereDataListeRequest: VeilederDataListeRequest): VeilederData[] => {
    const veilederIdenterSomSkalMockes = ['Z000002', 'Z123456', 'Z000003', 'Z995009'];

    return veiledereDataListeRequest.identer
        .filter(i => veilederIdenterSomSkalMockes.some(vism => vism === i))
        .map(veilederIdent => ({
            ident: veilederIdent,
            navn: 'Bond, James',
            fornavn: 'James',
            etternavn: 'Bond'
        }));
};

export const veilarbveilederHandlers: RequestHandlersList = [
    rest.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockEnhetVeiledere));
    }),
    rest.get('/veilarbveileder/api/enhet/:enhetId/navn', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockEnhetData));
    }),
    rest.get('/veilarbveileder/api/veileder/me', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockInnloggetVeileder));
    }),
    rest.post('/veilarbveileder/api/veileder/list', (req, res, ctx) => {
        const reqBody = req.body as VeilederDataListeRequest;
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockVeiledereNavn(reqBody)));
    })
];
