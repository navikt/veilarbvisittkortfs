import App from './app';
import NAVSPA from './NAVSPA';
import env from './app/utils/environment';

if (!(global as any)._babelPolyfill) {
    require('babel-polyfill');
}

if (env.isDevelopment) {
    require('./mock');
}

NAVSPA.eksporter('veilarbvisittkortfs', App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
