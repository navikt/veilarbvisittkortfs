import { OppgaveFormData, OppgaveFormResponse, OppgaveTema, OppgaveType } from '../../api/data/oppgave';

export enum OppgaveActionType {
    LAGRE_OPPGAVE = 'LAGRE_OPPGAVE',
    LAGRE_OPPGAVE_SUCCESS = 'LAGRE_OPPGAVE_SUCCESS',
    LAGRE_OPPGAVE_ERROR = 'LAGRE_OPPGAVE_ERROR',
}

export interface LagreOppgaveAction {
    type: OppgaveActionType.LAGRE_OPPGAVE;
    data: OppgaveFormData;
}

export interface LagreOppgaveActionSuccess {
    type: OppgaveActionType.LAGRE_OPPGAVE_SUCCESS;
    data: { tema: OppgaveTema; type: OppgaveType };
}

export interface LagreOppgaveActionError {
    type: OppgaveActionType.LAGRE_OPPGAVE_ERROR;
    error: Error;
}

export const lagreOppgave = (data: OppgaveFormData): LagreOppgaveAction => ({
    type: OppgaveActionType.LAGRE_OPPGAVE,
    data,
});

export const lagreOppgaveSuccess = (response: OppgaveFormResponse): LagreOppgaveActionSuccess => ({
    type: OppgaveActionType.LAGRE_OPPGAVE_SUCCESS,
    data: { tema: response.tema, type: response.type },
});

export const lagreOppgaveError = (error: Error): LagreOppgaveActionError => ({
    type: OppgaveActionType.LAGRE_OPPGAVE_ERROR,
    error,
});

export type OppgaveHistorikkActions = LagreOppgaveAction | LagreOppgaveActionSuccess | LagreOppgaveActionError;
