import { axiosInstance } from './utils';
import { AxiosPromise } from 'axios';
import { StringOrNothing } from '../util/type/stringornothings';

export interface OppgaveHistorikk {
	type: 'OPPRETTET_OPPGAVE';
	oppgaveTema: OppgaveTema;
	oppgaveType: OppgaveType;
	opprettetAv: 'NAV';
	opprettetAvBrukerId: string;
	dato: string; //OPPRETTET DATO
}

export type OppgaveTema =
	| 'DAGPENGER'
	| 'OPPFOLGING'
	| 'ARBEIDSAVKLARING'
	| 'INDIVIDSTONAD'
	| 'ENSLIG_FORSORGER'
	| 'TILLEGGSTONAD';

export type OppgaveType = 'VURDER_HENVENDELSE' | 'VURDER_KONSEKVENS_FOR_YTELSE';

export type PrioritetType = 'NORM' | 'LAV' | 'HOY';

export interface OppgaveFormData {
	avsenderenhetId: string;
	beskrivelse: string;
	enhetId: string;
	fnr: string;
	fraDato: string; //DATE??
	tilDato: string;
	prioritet: PrioritetType;
	tema: OppgaveTema;
	type: OppgaveType;
	veilederId: StringOrNothing;
}

export interface BehandlandeEnhet {
	enhetId: string;
	navn: string;
}

export interface OppgaveFormResponse {
	ID: string;
	aktoerid: string;
	opprettetAv: string;
	opprettetDato: string;
	tema: OppgaveTema;
	type: OppgaveType;
}

export function fetchOppgaveHistorikk(fnr: string): AxiosPromise<OppgaveHistorikk[]> {
	return axiosInstance.get<OppgaveHistorikk[]>(`/veilarboppgave/api/oppgavehistorikk?fnr=${fnr}`);
}

export function opprettOppgave(fnr: string, oppgaveFormData: OppgaveFormData): AxiosPromise<OppgaveFormResponse> {
	return axiosInstance.post(`/veilarboppgave/api/oppgave?fnr=${fnr}`, oppgaveFormData);
}

export function hentBehandlendeEnheter(tema: OppgaveTema, fnr: string): AxiosPromise<BehandlandeEnhet[]> {
	return axiosInstance.get<BehandlandeEnhet[]>(`/veilarboppgave/api/enheter?tema=${tema}&fnr=${fnr}`);
}
