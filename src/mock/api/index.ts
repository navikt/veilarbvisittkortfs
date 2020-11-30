import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { veilarbdialogHandlers } from './veilarbdialog';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarboppgaveHandlers } from './veilarboppgave';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbpersonflatefsHandlers } from './veilarbpersonflatefs';
import { veilarbportefoljeHandlers } from './veilarbportefolje';
import { veilarbregistreringHandlers } from './veilarbregistrering';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbveilederHandlers } from './veilarbveileder';

export const allHandlers: RequestHandlersList = [
    ...veilarbdialogHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarboppgaveHandlers,
    ...veilarbpersonHandlers,
    ...veilarbpersonflatefsHandlers,
    ...veilarbportefoljeHandlers,
    ...veilarbregistreringHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbveilederHandlers,
];
