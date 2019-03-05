import { fetchToJson } from './api-utils';
import { BehandlandeEnhet, OppgaveTema } from '../types/oppgave';

export interface OppgaveApi {
    hentBehandlandeEnheter: (tema: OppgaveTema, fnr: string) => Promise<BehandlandeEnhet[]>;
}

function hentBehandlandeEnheter(tema: OppgaveTema, fnr: string) {
    return fetchToJson(`/veilarboppgave/api/enhet?fnr=${fnr}&tema=${tema}`);
}

export default {
    hentBehandlandeEnheter,
} as OppgaveApi;