import { APP_NAME, isDevelopment } from './utils';
import { sendEventTilVeilarbperson } from '../api/veilarbperson';

export interface FrontendEvent {
    name: string;
    fields?: {};
    tags?: {};
}

export const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
    if (isDevelopment()) {
        // tslint:disable-next-line:no-console
        console.log('Event', metrikkNavn, 'Fields:', fields, 'Tags:', tags);
    } else {
        sendEventTilVeilarbperson({ name: `${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags });
    }
};
