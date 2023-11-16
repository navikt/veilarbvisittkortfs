import { setupWorker } from 'msw';
import { allHandlers } from './api';

export const worker = setupWorker(...allHandlers);
