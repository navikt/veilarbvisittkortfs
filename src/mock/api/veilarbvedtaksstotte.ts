import { defaultNetworkResponseDelay } from '../config';
import { delay, http, HttpResponse, RequestHandler } from 'msw';
import { Hovedmal, Innsatsgruppe, Oppfolgingsvedtak14a } from '../../api/veilarbvedtaksstotte';

export const veilarbvedtaksstotteHandlers: RequestHandler[] = [
    http.post('/veilarbvedtaksstotte/api/v2/utkast/hent-harUtkast', async () => {
        await delay(defaultNetworkResponseDelay);
        return HttpResponse.json(true);
    }),
    http.post('/veilarbvedtaksstotte/api/hent-gjeldende-14a-vedtak', async () => {
        await delay(defaultNetworkResponseDelay);
        const respons: Oppfolgingsvedtak14a = {
            innsatsgruppe: Innsatsgruppe.GODE_MULIGHETER,
            hovedmal: Hovedmal.SKAFFE_ARBEID,
            fattetDato: new Date()
        };
        return HttpResponse.json(respons);
    })
];
