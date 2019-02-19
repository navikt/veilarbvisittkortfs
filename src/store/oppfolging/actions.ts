import { Oppfolging } from '../../types/oppfolging';

export enum OppfolgingActionType {
    HENT_OPPFOLGING = 'HENT_OPPFOLGING',
    HENT_OPPFOLGING_SUCCESS = 'HENT_OPPFOLGING_SUCCESS',
    HENT_OPPFOLGING_ERROR = 'HENT_OPPFOLGING_ERROR',
    START_ESKALERING = 'OPPRETTER_HENVENDELSE_SUCCESS',
    START_ESKALERING_SUCCESS = 'START_ESKALERING_SUCCESS',
    START_ESKALERING_ERROR = 'START_ESKALARING_ERROR'
}

export const hentOppfolging = (fnr: string): HentOppfolgingAction => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING,
        fnr
    };
};

export const hentOppfolgingSuccess = (data: Oppfolging): HentOppfolgingActionSuccess => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING_SUCCESS,
        data
    };
};

export const hentOppfolgingError = (error: Error): HentOppfolgingActionError => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING_ERROR,
        error
    };
};

export const startEskaleringSuccess = (data: Oppfolging): StartEskaleringActionSuccess => ({
    type: OppfolgingActionType.START_ESKALERING_SUCCESS,
    data
});
export const startEskaleringError = (error: Error): StartEskaleringActionError => ({
    type: OppfolgingActionType.START_ESKALERING_ERROR,
    error
});

export interface HentOppfolgingAction {
    type: OppfolgingActionType.HENT_OPPFOLGING;
    fnr: string;
}

export interface StartEskalringAction {
    type: OppfolgingActionType.START_ESKALERING;
}

export interface StartEskaleringActionSuccess {
    type: OppfolgingActionType.START_ESKALERING_SUCCESS;
    data: Oppfolging;
}

export interface StartEskaleringActionError {
    type: OppfolgingActionType.START_ESKALERING_ERROR;
    error: Error;
}

export interface HentOppfolgingActionSuccess {
    type: OppfolgingActionType.HENT_OPPFOLGING_SUCCESS;
    data: Oppfolging;
}

export interface HentOppfolgingActionError {
    type: OppfolgingActionType.HENT_OPPFOLGING_ERROR;
    error: Error;
}

export type OppfolgingActions =
    HentOppfolgingAction |
    HentOppfolgingActionSuccess |
    HentOppfolgingActionError |
    StartEskalringAction |
    StartEskaleringActionSuccess |
    StartEskaleringActionError;