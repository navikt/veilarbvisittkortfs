import { mockEnhetVeiledere } from './common-data';
import { OppgaveFormData, OppgaveHistorikkInnslag } from '../../api/veilarboppgave';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

export const mockEnheter = [
    { enhetId: '0000', navn: 'Nav Ost' },
    { enhetId: '0001', navn: 'Nav Kjeks' },
    { enhetId: '0002', navn: 'Nav Med jætte lang navn' },
    { enhetId: '1234', navn: 'Nav jepps' }
];

const mockOppgavehistorikk: OppgaveHistorikkInnslag[] = [
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'ARBEIDSAVKLARING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z000004',
        dato: '2022-09-09T12:41:47.821+00:00'
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z995009',
        dato: '2018-01-31T15:17:46.872+01:00'
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:40:52.445+02:00'
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'DAGPENGER',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:43:19.348+02:00'
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'INDIVIDSTONAD',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990286',
        dato: '2018-09-07T10:46:34.778+02:00'
    },
    {
        type: 'OPPRETTET_OPPGAVE',
        oppgaveTema: 'OPPFOLGING',
        oppgaveType: 'VURDER_HENVENDELSE',
        opprettetAv: 'NAV',
        opprettetAvBrukerId: 'Z990582',
        dato: '2018-01-16T14:11:13.891+01:00'
    }
];

export const veilarboppgaveHandlers: RequestHandler[] = [
    http.post('/veilarboppgave/api/v2/hent-enheter', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockEnheter);
    }),
    http.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockEnhetVeiledere);
    }),
    http.post('/veilarboppgave/api/oppgave', async ({ request }) => {
        const requestBody = (await request.json()) as OppgaveFormData;
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json({
            ID: 123,
            aktoerid: '00000012345',
            gsakID: '1234',
            opprettetAv: 'Z000007',
            tema: requestBody.tema,
            type: requestBody.type
        });
    }),
    http.post('/veilarboppgave/api/v2/hent-oppgavehistorikk', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockOppgavehistorikk);
    })
];
