import ReactDOM from 'react-dom';
import NAVSPA from '@navikt/navspa';
import App from './app';
import React from 'react';
import { isDevelopment } from './util/utils';

NAVSPA.eksporter('veilarbvisittkortfs', App);

if (isDevelopment()) {
    require('./mock');

    ReactDOM.render(
        <App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />,
        document.getElementById('veilarbvisittkortfs-root')
    );
}
