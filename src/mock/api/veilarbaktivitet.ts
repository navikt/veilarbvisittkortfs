import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { defaultNetworkResponseDelay } from '../config';
import { AktivitetsDataGraphqlResponse } from '../../api/veilarbaktivitet';
import { GraphqlResponse } from '../../api/GraphqlUtils';

export const veilarbaktivitetHandlers: RequestHandler[] = [
    http.post('/veilarbaktivitet/api/arena/harTiltak', async () => {
        await delay(defaultNetworkResponseDelay);

        return HttpResponse.json(true);
    }),
    http.post('/veilarbaktivitet/api/graphql', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockAktviteterGraphqlResponse);
    })
];

export const mockAktviteterGraphqlResponse: GraphqlResponse<AktivitetsDataGraphqlResponse> = {
    errors: [],
    data: {
        planlagteMoter: [
            {
                id: '1',
                fraDato: '2024-06-01'
            },
            {
                id: '2',
                fraDato: '2024-06-15'
            }
        ]
    }
};
