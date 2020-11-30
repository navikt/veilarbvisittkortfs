import { Options } from 'axios-hooks';
import { axiosInstance, useAxios, UseAxiosResponseValue } from './utils';
import { AxiosResponse } from 'axios';
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

export function useFetchOppgaveHistorikk(fnr: string, options?: Options): UseAxiosResponseValue<OppgaveHistorikk[]> {
    return useAxios<OppgaveHistorikk[]>({ url: `/veilarboppgave/api/oppgavehistorikk?fnr=${fnr}` }, options);
}

export function opprettOppgave(
    fnr: string,
    oppgaveFormData: OppgaveFormData
): Promise<AxiosResponse<OppgaveFormResponse>> {
    return axiosInstance.post(`/veilarboppgave/api/oppgave?fnr=${fnr}`, oppgaveFormData);
}

export function hentBehandlendeEnheter(tema: OppgaveTema, fnr: string): Promise<AxiosResponse<BehandlandeEnhet[]>> {
    return axiosInstance.get<BehandlandeEnhet[]>(`/veilarboppgave/api/enheter?tema=${tema}&fnr=${fnr}`);
}
