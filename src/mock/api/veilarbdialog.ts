import { Egenskaper, EskaleringsvarselHistorikkInnslag, GjeldendeEskaleringsvarsel } from '../../api/veilarbdialog';
import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';

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

export const veilarbdialogHandlers: RequestHandler[] = [
    http.get('/veilarbdialog/api/dialog', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json([]);
    }),
    http.post('/veilarbdialog/api/dialog', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockHenvendelseData);
    }),
    http.put('/veilarbdialog/api/dialog/:dialogId/ferdigbehandlet/true', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(mockHenvendelseData);
    }),
    http.put('/veilarbdialog/api/dialog/:dialogId/venter_pa_svar/true', async () => {
        await delay(defaultNetworkResponseDelay);

        return HttpResponse.json(mockHenvendelseData);
    }),

    http.get('/veilarbdialog/api/eskaleringsvarsel/gjeldende', async () => {
        const gjeldendeEskaleringsvarsel: GjeldendeEskaleringsvarsel = {
            id: 1,
            tilhorendeDialogId: 42,
            opprettetAv: 'Z123456',
            opprettetDato: new Date().toISOString(),
            opprettetBegrunnelse: 'begrunnelse'
        };

        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(gjeldendeEskaleringsvarsel);
    }),
    http.get('/veilarbdialog/api/eskaleringsvarsel/historikk', async () => {
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

        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json([eskaleringsvarsel]);
    }),
    http.post('/veilarbdialog/api/eskaleringsvarsel/start', async () => {
        await delay(defaultNetworkResponseDelay);

        return new HttpResponse(null, { status: 200 });
    }),
    http.patch('/veilarbdialog/api/eskaleringsvarsel/stop', async () => {
        await delay(defaultNetworkResponseDelay);

        return new HttpResponse(null, { status: 200 });
    })
];
