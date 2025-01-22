import { veilarbaktivitetHandlers } from './veilarbaktivitet';
import { RequestHandler } from 'msw';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbdialogHandlers } from './veilarbdialog';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarboppgaveHandlers } from './veilarboppgave';
import { veilarbportefoljeHandlers } from './veilarbportefolje';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';

export const allHandlers: RequestHandler[] = [
    ...veilarbaktivitetHandlers,
    ...veilarbdialogHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarboppgaveHandlers,
    ...veilarbpersonHandlers,
    ...veilarbportefoljeHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbveilederHandlers
];
