import { Oppfolging } from '../../types/oppfolging';
import { OppfolgingActionType } from './action-type';
import {
    StartKVPAction,
    StartKVPActionError, StartKVPActionSuccess,
    StoppKVPAction,
    StoppKVPActionError,
    StoppKVPActionSuccess
} from './start-stopp-kvp-periode-actions';
import {
    SettDigitalAction,
    SettDigitalActionError,
    SettDigitalActionSuccess, SettManuellAction,
    SettManuellActionError, SettManuellActionSuccess
} from './sett-manuell-digitial-actions';

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
    StoppKVPActionError;