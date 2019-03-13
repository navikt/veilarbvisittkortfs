import { Oppfolging } from '../../types/oppfolging';
import { OppfolgingActionType } from './action-type';

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

export interface StartEskaleringAction {
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

export interface SettManuellAction {
    type: OppfolgingActionType.SETT_MANUELL;
    begrunnelse: string;
    fnr: string;
    veilederId: string;
}

export interface SettManuellActionSuccess {
    type: OppfolgingActionType.SETT_MANUELL_SUCCESS;
    data: Oppfolging;
}

export interface SettManuellActionError {
    type: OppfolgingActionType.SETT_MANUELL_ERROR;
    error: Error;
}

export interface SettDigitalAction {
    type: OppfolgingActionType.SETT_DIGITAL;
    begrunnelse: string;
    fnr: string;
    veilederId: string;
}

export interface SettDigitalActionSuccess {
    type: OppfolgingActionType.SETT_DIGITAL_SUCCESS;
    data: Oppfolging;
}

export interface SettDigitalActionError {
    type: OppfolgingActionType.SETT_DIGITAL_ERROR;
    error: Error;
}

export const settManuell = (begrunnelse: string, fnr: string, veilederId: string): SettManuellAction => ({
    type: OppfolgingActionType.SETT_MANUELL,
    begrunnelse,
    fnr,
    veilederId
});

export const settManuellSuccess = ( data: Oppfolging): SettManuellActionSuccess => ({
    type: OppfolgingActionType.SETT_MANUELL_SUCCESS,
    data
});

export const settManuellError = (error: Error): SettManuellActionError => ({
    type: OppfolgingActionType.SETT_MANUELL_ERROR,
    error
});

export const settDigital = (begrunnelse: string, fnr: string, veilederId: string): SettDigitalAction => ({
    type: OppfolgingActionType.SETT_DIGITAL,
    begrunnelse,
    fnr,
    veilederId
});

export const settDigitalSuccess = ( data: Oppfolging): SettDigitalActionSuccess => ({
    type: OppfolgingActionType.SETT_DIGITAL_SUCCESS,
    data
});

export const setDigitalError = (error: Error): SettDigitalActionError => ({
    type: OppfolgingActionType.SETT_DIGITAL_ERROR,
    error
});


export interface StartKVPAction {
    type: OppfolgingActionType.START_KVP;
    begrunnelse: string;
}

export interface StartKVPActionSuccess {
    type: OppfolgingActionType.START_KVP_SUCCESS;
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
}

export interface StoppKVPActionError {
    type: OppfolgingActionType.STOPP_KVP_ERROR;
    error: Error;
}

export const startKVP = (begrunnelse: string): StartKVPAction => ({
    type: OppfolgingActionType.START_KVP,
    begrunnelse
});

export const startKVPSuccess = (): StartKVPActionSuccess => ({
    type: OppfolgingActionType.START_KVP_SUCCESS,
});

export const startKVPError = (error: Error): StartKVPActionError => ({
    type: OppfolgingActionType.START_KVP_ERROR,
    error
});

export const stoppKVP = (begrunnelse: string): StoppKVPAction => ({
    type: OppfolgingActionType.STOPP_KVP,
    begrunnelse
});

export const stoppKVPSuccess = (): StoppKVPActionSuccess => ({
    type: OppfolgingActionType.STOPP_KVP_SUCCESS
});

export const stoppKVPError = (error: Error): StoppKVPActionError => ({
    type: OppfolgingActionType.STOPP_KVP_ERROR,
    error
});


export interface AvsluttOppfolgingAction {
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING,
    begrunnelse: string
}

export interface AvsluttOppfolgingActionSuccess {
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING_SUCCESS
    data: Oppfolging
}

export interface AvsluttOppfolgingActionError {
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING_ERROR,
    error: Error
}

export const avsluttOppfolging = (begrunnelse: string): AvsluttOppfolgingAction => ({
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING,
    begrunnelse,
});

export const avsluttOppfolgingSuccess = (data: Oppfolging): AvsluttOppfolgingActionSuccess =>({
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING_SUCCESS,
    data,
});

export const avsluttOppfolgingError = (error: Error): AvsluttOppfolgingActionError=> ({
    type: OppfolgingActionType.AVSLUTT_OPPFOLGING_ERROR,
    error
});


export type OppfolgingActions =
    HentOppfolgingAction |
    HentOppfolgingActionSuccess |
    HentOppfolgingActionError |
    StartEskaleringAction |
    StartEskaleringActionSuccess |
    StartEskaleringActionError |
    SettManuellAction |
    SettManuellActionSuccess |
    SettManuellActionError |
    SettDigitalAction |
    SettDigitalActionSuccess|
    SettDigitalActionError |
    StartKVPAction |
    StartKVPActionSuccess |
    StartKVPActionError |
    StoppKVPAction |
    StoppKVPActionSuccess |
    StoppKVPActionError |
    AvsluttOppfolgingAction |
    AvsluttOppfolgingActionSuccess |
    AvsluttOppfolgingActionError;