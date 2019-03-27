import Dialog, { Egenskaper } from '../../types/dialog';

export enum HenvendelseActionType {
    OPPRETTET_HENVENDELSE = 'OPPRETTET_HENVENDELSE',
    OPPRETTET_HENVENDELSE_ERROR =  'OPPRETT_HENVENDELSE_ERROR',
    OPPRETTET_HENVENDELSE_SUCCESS = 'OPPRETTER_HENVENDELSE_SUCCESS',
    HENT_DIALOGER = 'NAVIGER_TIL_PROSSER',
    HENT_DIALOGER_SUCCESS = 'HENT_DIALOGER_SUCCESS',
    HENT_DIALOGER_ERROR = 'HENT_DIALOGER_ERROR',
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

export interface HentDialogerAction {
    type: HenvendelseActionType.HENT_DIALOGER;
}

export interface HentDialogerActionSuccess {
    type: HenvendelseActionType.HENT_DIALOGER_SUCCESS;
    data: Dialog[];
}

export interface HentDialogerActionError {
    type: HenvendelseActionType.HENT_DIALOGER_ERROR;
    error: Error;
}

export const hentDialoger = (): HentDialogerAction => ({
    type: HenvendelseActionType.HENT_DIALOGER
});

export const hentDialogerSuccess = (data: Dialog[]): HentDialogerActionSuccess => ({
    type: HenvendelseActionType.HENT_DIALOGER_SUCCESS,
    data,
});

export const hentDialogerError = (error: Error): HentDialogerActionError => ({
   type: HenvendelseActionType.HENT_DIALOGER_ERROR,
   error
});

export type DialogActions =
    OpprettHenvendelseAction |
    OpprettHenvendelseActionSuccess |
    OpprettHenvendelseActionError |
    OppdaterDialogSuccess |
    HentDialogerAction |
    HentDialogerActionSuccess |
    HentDialogerActionError;