import { fetchToJson } from './api-utils';
import { BehandlandeEnhet, OppgaveTema } from '../types/oppgave';
import { OppgaveHistorikk } from '../types/oppgave-historikk';

export interface OppgaveApi {
    hentBehandlandeEnheter: (tema: OppgaveTema, fnr: string) => Promise<BehandlandeEnhet[]>;
    hentOppgaveHistorikk: (fnr: string) => Promise<OppgaveHistorikk[]>;
}

const OPPGAVE_BASE_URL = '/veilarboppgave/api';

function hentBehandlandeEnheter(tema: OppgaveTema, fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/enhet?fnr=${fnr}&tema=${tema}`);
}

export function hentOppgaveHistorikk(fnr: string) {
    return fetchToJson(`${OPPGAVE_BASE_URL}/oppgavehistorikk?fnr=${fnr}`);
}

export default {
    hentBehandlandeEnheter,
    hentOppgaveHistorikk
} as OppgaveApi;