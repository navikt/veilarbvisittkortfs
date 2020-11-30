import { setupWorker } from 'msw';
import { allHandlers } from './api';

setupWorker(...allHandlers)
    .start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
    .catch((e) => {
        // tslint:disable-next-line:no-console
        console.error('Unable to setup mocked API endpoints', e);
    });
