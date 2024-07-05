import { createRoot } from 'react-dom/client';
import { Navspa } from '@navikt/navspa';
import { isLocalDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import App from './app';
import { initAmplitude } from './amplitude/amplitude';

export * from './app';

dayjs.locale('nb');

Navspa.eksporter('veilarbvisittkortfs', App);

if (isLocalDevelopment()) {
    renderMockApp();
} else {
    initAmplitude();
}

function renderMockApp() {
    const container = document.getElementById('veilarbvisittkortfs-root');
    const root = createRoot(container!);

    import('./mock').then(({ worker }) => {
        return worker
            .start({ serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` } })
            .then(() => {
                root.render(<App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />);
                // eslint-disable-next-line no-console
                console.log('Bruker mock-data i applikasjonen');
            })
            .catch((e: Error) => {
                // eslint-disable-next-line no-console
                console.error('Unable to setup mocked API endpoints', e);
            });
    });
}
