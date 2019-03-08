import { fetchToJson } from './api-utils';
import { BehandlandeEnhet, OppgaveTema } from '../types/oppgave';
import { OppgaveHistorikk } from '../types/oppgave-historikk';
import {VeilederListe} from '../types/veilederdata';

export interface OppgaveApi {
    hentBehandlandeEnheter: (tema: OppgaveTema, fnr: string) => Promise<BehandlandeEnhet[]>;
    hentOppgaveHistorikk: (fnr: string) => Promise<OppgaveHistorikk[]>;
    hentOppgaveVeileder: (fnr: string, enhetsId: string) => Promise<VeilederListe>;
}

const OPPGAVE_BASE_URL = '/veilarboppgave/api';

function hentBehandlandeEnheter(tema: OppgaveTema, fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enhet?fnr=${fnr}&tema=${tema}`);
}

function hentOppgaveHistorikk(fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/oppgavehistorikk?fnr=${fnr}`);
}

function hentOppgaveVeileder(fnr: string, enhetsId: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enhet/${enhetsId}/veiledere?fnr=${fnr}`);
}

export default {
    hentBehandlandeEnheter,
    hentOppgaveHistorikk,
    hentOppgaveVeileder,

} as OppgaveApi;