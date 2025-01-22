import { mockEnhetVeiledere } from './common-data';
import { EnhetData, VeilederData, VeilederDataListeRequest } from '../../api/veilarbveileder';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

const mockEnhetData: EnhetData = {
    enhetId: '1337',
    navn: 'Nav Leeten'
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

export const veilarbveilederHandlers: RequestHandler[] = [
    http.get('/veilarbveileder/api/enhet/:enhetsid/veiledere', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockEnhetVeiledere);
    }),
    http.get('/veilarbveileder/api/enhet/:enhetId/navn', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockEnhetData);
    }),
    http.get('/veilarbveileder/api/veileder/me', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockInnloggetVeileder);
    }),
    http.post('/veilarbveileder/api/veileder/list', async ({ request }) => {
        await delay(defaultNetworkResponseDelay);
        const reqBody = (await request.json()) as VeilederDataListeRequest;
        return HttpResponse.json(mockVeiledereNavn(reqBody));
    })
];
