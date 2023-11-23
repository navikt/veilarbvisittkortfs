import { veilarbaktivitetHandlers } from './veilarbaktivitet';
import { RequestHandler } from 'msw';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbdialogHandlers } from './veilarbdialog';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarboppgaveHandlers } from './veilarboppgave';
import { oboUnleashHandlers } from './obo-unleash';
import { veilarbportefoljeHandlers } from './veilarbportefolje';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';

export const allHandlers: RequestHandler[] = [
    ...veilarbaktivitetHandlers,
    ...veilarbdialogHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarboppgaveHandlers,
    ...veilarbpersonHandlers,
    ...oboUnleashHandlers,
    ...veilarbportefoljeHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbveilederHandlers
];
