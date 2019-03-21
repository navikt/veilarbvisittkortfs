import { HenvendelseData } from '../store/dialog/actions';
import { postAsJson, putAsJson } from './api-utils';
import Dialog from '../types/dialog';

export interface DialogApi {
    nyHenvendelse: (henvendelse: HenvendelseData, fnr: string) => Promise<Dialog>;
    oppdaterFerdigbehandlet: (dialogId: string, erFerdigbehandlet: boolean, fnr: string) => Promise<Dialog>;
    oppdaterVenterPaSvar: (dialogId: string, venterPaSvar: boolean, fnr: string) => Promise<Dialog>;
}

function nyHenvendelse(henvendelse: HenvendelseData, fnr: string) {
    return postAsJson(`/veilarbdialog/api/dialog?fnr=${fnr}`, henvendelse);
}

function oppdaterFerdigbehandlet(dialogId: string, erFerdigbehandlet: boolean, fnr: string) {
    return putAsJson(
        `/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${erFerdigbehandlet}?fnr=${fnr}`
    );
}

function oppdaterVenterPaSvar(dialogId: string, venterPaSvar: boolean, fnr: string) {
    return putAsJson(
        `/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}}?fnr=${fnr}`
    );
}

export default {
    nyHenvendelse,
    oppdaterFerdigbehandlet,
    oppdaterVenterPaSvar,
} as DialogApi;