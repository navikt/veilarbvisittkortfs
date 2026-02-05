import { axiosInstance, fetchWithPost, swrOptions } from './utils';
import { AxiosPromise } from 'axios';
import { StringOrNothing } from '../util/type/utility-types';
import { behandlingsnummer } from './behandlingsnummer';
import useSWR from 'swr';

export interface OppgaveHistorikkInnslag {
    type: 'OPPRETTET_OPPGAVE';
    oppgaveTema: OppgaveTema;
    oppgaveType: OppgaveType;
    opprettetAv: 'NAV';
    opprettetAvBrukerId: string;
    opprettetAvBrukerNavn?: StringOrNothing;
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

export const useOppgaveHistorikk = (fnr: string | undefined) => {
    const url = '/veilarboppgave/api/v2/hent-oppgavehistorikk';
    const { data, isLoading, error } = useSWR<OppgaveHistorikkInnslag[]>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
    return { oppgaveHistorikkData: data, oppgaveHistorikkLoaing: isLoading, oppgaveHistorikkError: error };
};

export function opprettOppgave(fnr: string, oppgaveFormData: OppgaveFormData): AxiosPromise<OppgaveFormResponse> {
    oppgaveFormData.fnr = fnr;
    return axiosInstance.post(`/veilarboppgave/api/oppgave`, oppgaveFormData);
}

export function hentBehandlendeEnheter(tema: OppgaveTema, fnr: string): AxiosPromise<BehandlandeEnhet[]> {
    return axiosInstance.post<BehandlandeEnhet[]>(`/veilarboppgave/api/v2/hent-enheter?tema=${tema}`, {
        fnr: fnr,
        behandlingsnummer
    });
}
