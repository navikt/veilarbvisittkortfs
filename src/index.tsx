import App from './app';
import env from './component/utils/environment';
import NAVSPA from '@navikt/navspa';

if (!(global as any)._babelPolyfill) {
    require('babel-polyfill');
}

if (env.isMock) {
    require('./mock');
}

NAVSPA.eksporter('veilarbvisittkortfs', App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
