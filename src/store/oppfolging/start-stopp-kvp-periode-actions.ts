import { OppfolgingActionType } from './action-type';

export interface StartKVPAction {
    type: OppfolgingActionType.START_KVP;
    begrunnelse: string;
}

export interface StartKVPActionSuccess {
    type: OppfolgingActionType.START_KVP_SUCCESS;
    begrunnelse:string;
}

export interface StartKVPActionError {
    type: OppfolgingActionType.START_KVP_ERROR;
    error: Error;
}

export interface StoppKVPAction {
    type: OppfolgingActionType.STOPP_KVP;
    begrunnelse: string;
}

export interface StoppKVPActionSuccess {
    type: OppfolgingActionType.STOPP_KVP_SUCCESS;
    begrunnelse: string;
}

export interface StoppKVPActionError {
    type: OppfolgingActionType.STOPP_KVP_ERROR;
    error: Error;
}

export const startKVP = (begrunnelse: string): StartKVPAction => ({
    type: OppfolgingActionType.START_KVP,
    begrunnelse
});

export const startKVPSuccess = (begrunnelse:string): StartKVPActionSuccess => ({
    type: OppfolgingActionType.START_KVP_SUCCESS,
    begrunnelse
});

export const startKVPError = (error: Error): StartKVPActionError => ({
    type: OppfolgingActionType.START_KVP_ERROR,
    error
});

export const stoppKVP = (begrunnelse: string): StoppKVPAction => ({
    type: OppfolgingActionType.STOPP_KVP,
    begrunnelse
});

export const stoppKVPSuccess = (begrunnelse: string): StoppKVPActionSuccess => ({
    type: OppfolgingActionType.STOPP_KVP_SUCCESS,
    begrunnelse
});

export const stoppKVPError = (error: Error): StoppKVPActionError => ({
    type: OppfolgingActionType.STOPP_KVP_ERROR,
    error
});
