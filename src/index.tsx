import React from 'react';
import ReactDOM from 'react-dom';
import { Navspa } from '@navikt/navspa';
import { isLocalDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import App from './app';
import { initAmplitude } from './amplitude/amplitude';

dayjs.locale('nb');

Navspa.eksporter('veilarbvisittkortfs', App);

if (isLocalDevelopment()) {
    const { worker } = require('./mock');

    worker
        .start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
        .then(() =>
            ReactDOM.render(
                <App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />,
                document.getElementById('veilarbvisittkortfs-root')
            )
        )
        .catch((e: any) => {
            // eslint-disable-next-line no-console
            console.error('Unable to setup mocked API endpoints', e);
        });
} else {
    initAmplitude();
}
