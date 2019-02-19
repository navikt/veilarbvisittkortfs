import { HenvendelseData } from '../store/dialog/actions';
import { postAsJson, putAsJson } from './api-utils';
import Dialog from '../types/dialog';

export interface DialogApi {
    nyHenvendelse: (henvendelse: HenvendelseData) => Promise<Dialog>;
    oppdaterFerdigbehandlet: (dialogId: string, erFerdigbehandlet: boolean) => Promise<Dialog>;
    oppdaterVenterPaSvar: (dialogId: string, venterPaSvar: boolean) => Promise<Dialog>;
}

function nyHenvendelse(henvendelse: HenvendelseData) {
    return postAsJson(`/veilarbdialog/api/dialog`, henvendelse);
}

function oppdaterFerdigbehandlet(dialogId: string, erFerdigbehandlet: boolean) {
    return putAsJson(
        `/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${erFerdigbehandlet}`
    );
}

function oppdaterVenterPaSvar(dialogId: string, venterPaSvar: boolean) {
    return putAsJson(
        `/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}`
    );
}

export default {
    nyHenvendelse,
    oppdaterFerdigbehandlet,
    oppdaterVenterPaSvar,
} as DialogApi;