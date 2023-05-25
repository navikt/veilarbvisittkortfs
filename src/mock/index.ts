import { setupWorker } from 'msw';
import { allHandlers } from './api';


setupWorker(...allHandlers)
    .start({ serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    }})
    .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Unable to setup mocked API endpoints', e);
    });
