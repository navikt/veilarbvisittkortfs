import React from 'react';
import ReactDOM from 'react-dom';
import { Navspa } from '@navikt/navspa';
import { isDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import App from './app';

dayjs.locale('nb');

Navspa.eksporter('veilarbvisittkortfs', App);

if (isDevelopment()) {
    require('./mock');

    ReactDOM.render(
        <App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />,
        document.getElementById('veilarbvisittkortfs-root')
    );
}
