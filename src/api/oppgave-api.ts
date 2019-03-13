import { fetchToJson, postAsJson } from './api-utils';
import { BehandlandeEnhet, OppgaveFormData, OppgaveFormResponse, OppgaveTema } from '../types/oppgave';
import { OppgaveHistorikk } from '../types/oppgave-historikk';
import { VeilederListe } from '../types/veilederdata';

export interface OppgaveApi {
    hentBehandlandeEnheter: (tema: OppgaveTema, fnr: string) => Promise<BehandlandeEnhet[]>;
    hentOppgaveHistorikk: (fnr: string) => Promise<OppgaveHistorikk[]>;
    lagreOppgave: (fnr: string, oppgaveFormData: OppgaveFormData) => Promise<OppgaveFormResponse>;
    hentOppgaveVeileder: (fnr: string, enhetsId: string) => Promise<VeilederListe>;
}

const OPPGAVE_BASE_URL = '/veilarboppgave/api';

function hentBehandlandeEnheter(tema: OppgaveTema, fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enheter?tema=${tema}&fnr=${fnr}`);
}

function hentOppgaveHistorikk(fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/oppgavehistorikk?fnr=${fnr}`);
}

function hentOppgaveVeileder(fnr: string, enhetsId: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enhet/${enhetsId}/veiledere?fnr=${fnr}`);
}

function lagreOppgave(fnr: string, oppgaveFormData: OppgaveFormData) {
    return postAsJson(`${OPPGAVE_BASE_URL}/oppgave?fnr=${fnr}`, oppgaveFormData);
}

export default {
    hentBehandlandeEnheter,
    hentOppgaveHistorikk,
    hentOppgaveVeileder,
    lagreOppgave

} as OppgaveApi;