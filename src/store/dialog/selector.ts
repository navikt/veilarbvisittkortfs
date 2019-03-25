import { Appstate } from '../../types/appstate';

export interface DialogSelector {
    selectDialogStatus: (state: Appstate) => boolean;
    selectHarUbehandledeDialoger: (state: Appstate) => boolean;
}

function selectDialogStatus(state: Appstate): boolean {
    const dialogStatus = state.dialoger.status;
    return dialogStatus === 'NOT_STARTED' || dialogStatus === 'LOADING';
}

export function selectHarUbehandledeDialoger(state: Appstate): boolean {
    const data = state.dialoger.data;
    return (
        data.filter(
            dialog =>
                !dialog.historisk &&
                (!dialog.ferdigBehandlet || dialog.venterPaSvar)
        ).length > 0
    );
}

export default {
    selectDialogStatus,
    selectHarUbehandledeDialoger
}as DialogSelector;