import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { veilarbdialogHandlers } from './veilarbdialog';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarboppgaveHandlers } from './veilarboppgave';
import { veilarbpersonHandlers } from './veilarbperson';
import { oboUnleashHandlers } from './obo-unleash';
import { veilarbportefoljeHandlers } from './veilarbportefolje';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarbaktivitetHandlers } from './veilarbaktivitet';

export const allHandlers: RequestHandlersList = [
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
