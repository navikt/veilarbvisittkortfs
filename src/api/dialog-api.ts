import { HenvendelseData } from '../store/dialog/actions';
import { fetchToJson, postAsJson, putAsJson } from './api-utils';
import Dialog from '../types/dialog';

const DIALOG_BASE_URL = '/veilarbdialog/api/dialog';

export interface DialogApi {
    nyHenvendelse: (henvendelse: HenvendelseData, fnr: string) => Promise<Dialog>;
    oppdaterFerdigbehandlet: (dialogId: string, erFerdigbehandlet: boolean, fnr: string) => Promise<Dialog>;
    oppdaterVenterPaSvar: (dialogId: string, venterPaSvar: boolean, fnr: string) => Promise<Dialog>;
    hentDialoger: (fnr: string) => Promise<Dialog[]>;
}

function nyHenvendelse(henvendelse: HenvendelseData, fnr: string) {
    return postAsJson(`${DIALOG_BASE_URL}?fnr=${fnr}`, henvendelse);
}

function oppdaterFerdigbehandlet(dialogId: string, erFerdigbehandlet: boolean, fnr: string) {
    return putAsJson(
        `${DIALOG_BASE_URL}${dialogId}/ferdigbehandlet/${erFerdigbehandlet}?fnr=${fnr}`
    );
}

function oppdaterVenterPaSvar(dialogId: string, venterPaSvar: boolean, fnr: string) {
    return putAsJson(
        `${DIALOG_BASE_URL}/${dialogId}/venter_pa_svar/${venterPaSvar}?fnr=${fnr}`
    );
}

function hentDialoger(fnr: string) {
    return fetchToJson(`${DIALOG_BASE_URL}?fnr=${fnr}`);
}

export default {
    nyHenvendelse,
    oppdaterFerdigbehandlet,
    oppdaterVenterPaSvar,
    hentDialoger,
} as DialogApi;