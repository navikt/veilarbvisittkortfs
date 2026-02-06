import { createRoot } from 'react-dom/client';
import { Navspa } from '@navikt/navspa';
import { isLocalDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/nb';
import App from './app';
import { exposeVisittkortAsWebComponent } from './webComponentWrapper';

dayjs.locale('nb');
dayjs.extend(relativeTime);

Navspa.eksporter('veilarbvisittkortfs', App);
exposeVisittkortAsWebComponent();

if (isLocalDevelopment()) {
    renderMockApp();
}

function renderMockApp() {
    const container = document.getElementById('veilarbvisittkortfs-root');
    const root = createRoot(container!);

    import('./mock').then(({ worker }) => {
        return worker
            .start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
            .then(() => {
                root.render(
                    <ao-visittkort
                        fnr={'10108000398'}
                        enhet={'1234'}
                        tilbakeTilFlate={''}
                        visVeilederVerktoy={'true'}
                    />
                );
                // eslint-disable-next-line no-console
                console.log('Bruker mock-data i applikasjonen');
            })
            .catch((e: Error) => {
                // eslint-disable-next-line no-console
                console.error('Unable to setup mocked API endpoints', e);
            });
    });
}
