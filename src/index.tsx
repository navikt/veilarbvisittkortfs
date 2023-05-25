import React from 'react';
import ReactDOM from 'react-dom';
import { Navspa } from '@navikt/navspa';
import { isDevelopment } from './util/utils';
import * as dayjs from 'dayjs';
import 'dayjs/locale/nb';
import App from './app';
import {createRoot} from "react-dom/client";

dayjs.locale('nb');

Navspa.eksporter('veilarbvisittkortfs', App);

if (isDevelopment()) {
    import('./mock').then(() => {
        const rootElement = document.getElementById("veilarbvisittkortfs-root")
        const root = createRoot(rootElement!)
        root.render(
            <App fnr={'10108000398'} enhet={'1234'} tilbakeTilFlate={''} visVeilederVerktoy={true} />
        );
    });
}
