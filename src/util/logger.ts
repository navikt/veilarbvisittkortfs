import { isDevelopment } from './utils';
import { sendEventTilVeilarbperson } from '../api/veilarbperson';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logMetrikk = (name: string, fields?: {}, tags?: {}): void => {
    if (isDevelopment()) {
        // eslint-disable-next-line no-console
        console.log('Event', name, 'Fields:', fields, 'Tags:', tags);
    } else {
        sendEventTilVeilarbperson({ name, fields, tags });
    }
};
