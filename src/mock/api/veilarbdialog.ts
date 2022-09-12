import { rest } from 'msw';
import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { Egenskaper, EskaleringsvarselHistorikkInnslag, GjeldendeEskaleringsvarsel } from '../../api/veilarbdialog';
import { defaultNetworkResponseDelay } from '../config';

const mockHenvendelseData: any = {
    aktivitetId: null,
    egenskaper: [Egenskaper.ESKALERINGSVARSEL],
    erLestAvBruker: false,
    ferdigBehandlet: true,
    henvendelser: [
        {
            avsender: 'VEILEDER',
            avsenderId: 'Z123456',
            dialogId: '1665',
            id: '2201',
            lest: true,
            sendt: '2019-04-04T13:34:51.086+02:00',
            tekst:
                'Generell innledningstekst:Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.'
        }
    ],
    historisk: false,
    id: '1665',
    lest: true,
    lestAvBrukerTidspunkt: null,
    opprettetDato: '2019-04-04T13:34:51.057+02:00',
    overskrift: 'Du har fått et varsel fra NAV',
    sisteDato: '2019-04-04T13:34:51.086+02:00',
    sisteTekst:
        'Generell innledningstekst:Les denne meldingen nøye og gi beskjed til veilederen din hvis det er noe du lurer på. Det gjør du ved å svare på denne meldingen.',
    venterPaSvar: false
};

export const veilarbdialogHandlers: RequestHandlersList = [
    rest.post('/veilarbdialog/api/dialog', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockHenvendelseData));
    }),
    rest.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/true', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockHenvendelseData));
    }),
    rest.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/true', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(mockHenvendelseData));
    }),

    rest.get('/veilarbdialog/api/eskaleringsvarsel/gjeldende', (req, res, ctx) => {
        const gjeldendeEskaleringsvarsel: GjeldendeEskaleringsvarsel = {
            id: 1,
            tilhorendeDialogId: 42,
            opprettetAv: 'Z123456',
            opprettetDato: new Date().toISOString(),
            opprettetBegrunnelse: 'begrunnelse'
        };
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json(gjeldendeEskaleringsvarsel));
    }),
    rest.get('/veilarbdialog/api/eskaleringsvarsel/historikk', (req, res, ctx) => {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        const eskaleringsvarsel: EskaleringsvarselHistorikkInnslag = {
            id: 1,
            tilhorendeDialogId: 42,
            opprettetAv: 'Z123456',
            opprettetDato: yesterday.toISOString(),
            opprettetBegrunnelse: 'Begrunnelse for start av eskalering',
            avsluttetDato: now.toISOString(),
            avsluttetAv: 'Z123456',
            avsluttetBegrunnelse: 'Begrunnelse for stopp av eskalering'
        };

        return res(ctx.delay(defaultNetworkResponseDelay), ctx.json([eskaleringsvarsel]));
    }),
    rest.post('/veilarbdialog/api/eskaleringsvarsel/start', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.status(200));
    }),
    rest.patch('/veilarbdialog/api/eskaleringsvarsel/stop', (req, res, ctx) => {
        return res(ctx.delay(defaultNetworkResponseDelay), ctx.status(200));
    })
];
