import App from './app';
import env from './component/utils/environment';
import NAVSPA from '@navikt/navspa';

if (!(global as any)._babelPolyfill) {
    require('babel-polyfill');
}

if (env.isMock) {
    require('./mock/setup');
}

NAVSPA.eksporter('veilarbvisittkortfs', App);
