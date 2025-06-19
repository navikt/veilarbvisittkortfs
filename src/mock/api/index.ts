import { veilarbaktivitetHandlers } from './veilarbaktivitet';
import { RequestHandler } from 'msw';
import { veilarbpersonHandlers } from './veilarbperson';
import { veilarbdialogHandlers } from './veilarbdialog';
import { veilarboppfolgingHandlers } from './veilarboppfolging';
import { veilarbveilederHandlers } from './veilarbveileder';
import { veilarboppgaveHandlers } from './veilarboppgave';
import { veilarbpersonflatefsHandlers } from './veilarbpersonflatefs';
import { veilarbportefoljeHandlers } from './veilarbportefolje';
import { veilarbvedtaksstotteHandlers } from './veilarbvedtaksstotte';
import { aoOppfolgingskontorHandlers } from './ao-oppfolgingskontor';

export const allHandlers: RequestHandler[] = [
    ...veilarbaktivitetHandlers,
    ...veilarbdialogHandlers,
    ...veilarboppfolgingHandlers,
    ...veilarboppgaveHandlers,
    ...veilarbpersonHandlers,
    ...veilarbpersonflatefsHandlers,
    ...veilarbportefoljeHandlers,
    ...veilarbvedtaksstotteHandlers,
    ...veilarbveilederHandlers,
    ...aoOppfolgingskontorHandlers
];
