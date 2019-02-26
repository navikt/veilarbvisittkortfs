import { Oppfolging } from '../../types/oppfolging';
import { OppfolgingActionType } from './action-type';

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