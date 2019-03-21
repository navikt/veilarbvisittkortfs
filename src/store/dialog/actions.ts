import Dialog, { Egenskaper } from '../../types/dialog';

export enum HenvendelseActionType {
    OPPRETTET_HENVENDELSE = 'OPPRETTET_HENVENDELSE',
    OPPRETTET_HENVENDELSE_ERROR =  'OPPRETT_HENVENDELSE_ERROR',
    OPPRETTET_HENVENDELSE_SUCCESS = 'OPPRETTER_HENVENDELSE_SUCCESS'
}

export enum DialogActionType {
    OPPDATER_DIALOG = 'OPPDATER_DIALOG',
    OPPDATER_DIALOG_SUCCESS = 'OPPDATER_DIALOG_SUCCESS',
    OPPDATER_DIALOG_ERROR = 'OPPDATER_DIALOG_ERROR',
}

export interface HenvendelseData {
    begrunnelse: string;
    egenskaper: Egenskaper[];
    overskrift: string;
    tekst: string;
}

export interface OpprettHenvendelseAction {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE;
    data: HenvendelseData;
}

export interface OpprettHenvendelseActionSuccess {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS;
    data: Dialog;
    fnr: string;
}

export interface OpprettHenvendelseActionError {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_ERROR;
    error: Error;
}

export interface OppdaterDialogSuccess {
    type: DialogActionType.OPPDATER_DIALOG_SUCCESS;
    data: Dialog;
}

export function oppdaterDialogSuccess(data: Dialog): OppdaterDialogSuccess {
    return {
        type: DialogActionType.OPPDATER_DIALOG_SUCCESS,
        data
    };
}

export function opprettHenvendelse(data: HenvendelseData): OpprettHenvendelseAction {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE,
        data
    };
}

export function opprettHenvendelseSuccess(data: Dialog, fnr: string): OpprettHenvendelseActionSuccess {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS,
        data,
        fnr
    };
}

export function opprettHenvendelseError(error: Error): OpprettHenvendelseActionError {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_ERROR,
        error
    };
}
export type DialogActions = OpprettHenvendelseAction | OpprettHenvendelseActionSuccess | OpprettHenvendelseActionError | OppdaterDialogSuccess;