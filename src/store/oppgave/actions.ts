import { OppgaveHistorikk } from '../../types/oppgave-historikk';
import { OppgaveFormData, OppgaveFormResponse, OppgaveTema, OppgaveType } from '../../types/oppgave';

export enum OppgaveActionType {
    HENT_OPPGAVEHISTORIKK = 'HENT_OPPGAVEHISTORIKK',
    HENT_OPPGAVEHISTORIKK_ERROR =  'HENT_OPPGAVEHISTORIKK_ERROR',
    HENT_OPPGAVEHISTORIKK_SUCCESS = 'HENT_OPPGAVEHISTORIKK_SUCCESS',
    LAGRE_OPPGAVE = 'LAGRE_OPPGAVE',
    LAGRE_OPPGAVE_SUCCESS = 'LAGRE_OPPGAVE_SUCCESS',
    LAGRE_OPPGAVE_ERROR = 'LAGRE_OPPGAVE_ERROR'
}

export interface HentOppgavehistorikkAction {
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK;
    fnr: string;
}

interface HentOppgavehistorikkActionSuccess {
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK_SUCCESS;
    data: OppgaveHistorikk[];
}

interface HentOppgavehistorikkActionError {
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK_ERROR;
    error: Error;
}

export interface LagreOppgaveAction {
    type: OppgaveActionType.LAGRE_OPPGAVE;
    data: OppgaveFormData;
}

export interface LagreOppgaveActionSuccess {
    type: OppgaveActionType.LAGRE_OPPGAVE_SUCCESS;
    data: {tema: OppgaveTema, type: OppgaveType};
}

export interface LagreOppgaveActionError {
    type: OppgaveActionType.LAGRE_OPPGAVE_ERROR;
    error: Error;
}

export const hentOppgavehistorikk = (fnr: string): HentOppgavehistorikkAction => ({
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK,
    fnr
});

export const hentOppgavehistorikkSuccess = (data: OppgaveHistorikk[]): HentOppgavehistorikkActionSuccess => ({
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK_SUCCESS,
    data,
});

export const hentOppgavehistorikkError = (error: Error): HentOppgavehistorikkActionError  => ({
    type: OppgaveActionType.HENT_OPPGAVEHISTORIKK_ERROR,
    error
});

export const lagreOppgave = (data: OppgaveFormData): LagreOppgaveAction => ({
    type: OppgaveActionType.LAGRE_OPPGAVE,
    data
});

export const lagreOppgaveSuccess = (response: OppgaveFormResponse): LagreOppgaveActionSuccess => ({
    type: OppgaveActionType.LAGRE_OPPGAVE_SUCCESS,
    data: {tema: response.tema, type: response.type}
});

export const lagreOppgaveError = (error: Error): LagreOppgaveActionError => ({
    type: OppgaveActionType.LAGRE_OPPGAVE_ERROR,
    error
});

export type OppgaveHistorikkActions =
    HentOppgavehistorikkAction |
    HentOppgavehistorikkActionSuccess |
    HentOppgavehistorikkActionError |
    LagreOppgaveAction |
    LagreOppgaveActionSuccess |
    LagreOppgaveActionError;