import App from './App';
import * as serviceWorker from './serviceWorker';
import NAVSPA from "./NAVSPA";

if (process.env.NODE_ENV === 'development') {
    require('./mock');
}

NAVSPA.eksporter('veilarbvisittkortfs', App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
