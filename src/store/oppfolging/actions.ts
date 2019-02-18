import {Oppfolging} from "../../types/oppfolging";

export enum OppfolgingActionType {
    HENT_OPPFOLGING = 'HENT_OPPFOLGING',
    HENT_OPPFOLGING_SUCCESS = 'HENT_OPPFOLGING_SUCCESS',
    HENT_OPPFOLGING_ERROR = 'HENT_OPPFOLGING_ERROR',
}


export const hentOppfolging = (fnr: string): HentOppfolgingAction => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING,
        fnr
    }
};

export const hentOppfolgingSuccess = (data: Oppfolging): HentOppfolgingActionSuccess => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING_SUCCESS,
        data
    }
};

export const hentOppfolgingError = (error: Error): HentOppfolgingActionError => {
    return {
        type: OppfolgingActionType.HENT_OPPFOLGING_ERROR,
        error
    }
};


export interface HentOppfolgingAction {
    type: OppfolgingActionType.HENT_OPPFOLGING
    fnr:string;
}

export interface HentOppfolgingActionSuccess {
    type: OppfolgingActionType.HENT_OPPFOLGING_SUCCESS,
    data: Oppfolging;
}

export interface HentOppfolgingActionError {
    type: OppfolgingActionType.HENT_OPPFOLGING_ERROR,
    error: Error
}

export type OppfolgingActions = HentOppfolgingAction | HentOppfolgingActionSuccess | HentOppfolgingActionError;