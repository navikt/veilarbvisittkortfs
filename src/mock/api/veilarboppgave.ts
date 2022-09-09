import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { mockEnhetVeiledere } from './common-data';
import { OppgaveFormData, OppgaveHistorikkInnslag } from '../../api/veilarboppgave';
import { defaultNetworkResponseDelay } from '../config';

const mockEnheter = [
    { enhetId: '0000', navn: 'NAV Ost' },
    { enhetId: '0001', navn: 'NAV Kjeks' },
    { enhetId: '0002', navn: 'NAV Med jætte lang navn' },
    { enhetId: '1234', navn: 'NAV jepps' }
];

const mockOppgavehistorikk: OppgaveHistorikkInnslag[] = [
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

export const veilarboppgaveHandlers: RequestHandlersList = [
    rest.get('/veilarboppgave/api/enheter', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockEnheter));
    }),
    rest.get('/veilarboppgave/api/enhet/:enhetsId/veiledere', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockEnhetVeiledere));
    }),
    rest.post('/veilarboppgave/api/oppgave', (req, res, ctx) => {
        const requestBody = req.body as OppgaveFormData;
        return res(
            ctx.delay(defaultNetworkResponseDelay),
            ctx.json({
                ID: 123,
                aktoerid: '00000012345',
                gsakID: '1234',
                opprettetAv: 'Z007',
                tema: requestBody.tema,
                type: requestBody.type
            })
        );
    }),
    rest.get('/veilarboppgave/api/oppgavehistorikk', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockOppgavehistorikk));
    })
];
