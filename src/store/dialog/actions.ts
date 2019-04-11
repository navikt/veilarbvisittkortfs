import Dialog, { Egenskaper } from '../../types/dialog';

export enum HenvendelseActionType {
    OPPRETTET_HENVENDELSE_START_ESKALERING = 'OPPRETTET_HENVENDELSE_START_ESKALERING',
    OPPRETTET_HENVENDELSE_START_ESKALERING_ERROR =  'OPPRETTET_HENVENDELSE_START_ESKALERING_ERROR',
    OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS = 'OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS',
    OPPRETTET_HENVENDELSE_STOPP_ESKALERING = 'OPPRETTET_HENVENDELSE_STOPP_ESKALERING',
    OPPRETTET_HENVENDELSE_STOPP_ESKALERING_ERROR =  'OPPRETTET_HENVENDELSE_STOPP_ESKALERING_ERROR',
    OPPRETTET_HENVENDELSE_STOPP_ESKALERING_SUCCESS = 'OPPRETTET_HENVENDELSE_STOPP_ESKALERING_SUCCESS',
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
    overskrift?: string;
    tekst: string;
    dialogId?: string;
}

export interface OpprettHenvendelseStoppEskaleringAction {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING;
    data: HenvendelseData;
}

export interface OpprettHenvendelseStoppEskaleringActionSuccess {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_SUCCESS;
    data: Dialog;
    fnr: string;
}

export interface OpprettHenvendelseStoppEskaleringActionError {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_ERROR;
    error: Error;
}

export function opprettHenvendelseStoppEskalering(data: HenvendelseData): OpprettHenvendelseStoppEskaleringAction {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING,
        data
    };
}

export function opprettHenvendelseStoppEskaleringSuccess(data: Dialog, fnr: string): OpprettHenvendelseStoppEskaleringActionSuccess {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_SUCCESS,
        data,
        fnr
    };
}

export function opprettHenvendelseStoppEskaleringError(error: Error): OpprettHenvendelseStoppEskaleringActionError {
   return {
       type: HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_ERROR,
       error
   };
}

export interface OpprettHenvendelseAction {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING;
    data: HenvendelseData;
}

export interface OpprettHenvendelseActionSuccess {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS;
    data: Dialog;
    fnr: string;
}

export interface OpprettHenvendelseActionError {
    type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_ERROR;
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
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING,
        data
    };
}

export function opprettHenvendelseSuccess(data: Dialog, fnr: string): OpprettHenvendelseActionSuccess {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS,
        data,
        fnr
    };
}

export function opprettHenvendelseError(error: Error): OpprettHenvendelseActionError {
    return {
        type: HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_ERROR,
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
    HentDialogerActionError|
    OpprettHenvendelseStoppEskaleringAction |
    OpprettHenvendelseStoppEskaleringActionSuccess |
    OpprettHenvendelseStoppEskaleringActionError;