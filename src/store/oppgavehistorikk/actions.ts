import {OppgaveHistorikk} from "../../types/oppgave-historikk";

export enum OppgaveHistorikkActionType {
    HENT_OPPGAVEHISTORIKK = 'HENT_OPPGAVEHISTORIKK',
    HENT_OPPGAVEHISTORIKK_ERROR =  'HENT_OPPGAVEHISTORIKK_ERROR',
    HENT_OPPGAVEHISTORIKK_SUCCESS = 'HENT_OPPGAVEHISTORIKK_SUCCESS'
}

export interface HentOppgavehistorikkAction {
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK;
    fnr: string;
}

interface HentOppgavehistorikkActionSuccess {
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_SUCCESS;
    data: OppgaveHistorikk[];
}

interface HentOppgavehistorikkActionError {
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_ERROR;
    error: Error;
}


export const hentOppgavehistorikk = (fnr: string): HentOppgavehistorikkAction => ({
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK,
    fnr
});

export const hentOppgavehistorikkSuccess = (data: OppgaveHistorikk[]): HentOppgavehistorikkActionSuccess => ({
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_SUCCESS,
    data,
});

export const hentOppgavehistorikkError = (error: Error): HentOppgavehistorikkActionError  => ({
    type: OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_ERROR,
    error
});


export type OppgaveHistorikkActions = HentOppgavehistorikkAction | HentOppgavehistorikkActionSuccess | HentOppgavehistorikkActionError;