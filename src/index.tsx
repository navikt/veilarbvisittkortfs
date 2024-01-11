import React from 'react';
import { Navspa } from '@navikt/navspa';
import { isDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import App from './app';
import { createRoot } from 'react-dom/client';
import { initAmplitude } from './amplitude/amplitude';

dayjs.locale('nb');

Navspa.eksporter('veilarbvisittkortfs', App);

if (isDevelopment()) {
    const { worker } = await import('./mock');
    await worker.start();
    const rootElement = document.getElementById('veilarbvisittkortfs-root');
    const root = createRoot(rootElement!);
    root.render(<App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />);
} else {
    initAmplitude();
}
