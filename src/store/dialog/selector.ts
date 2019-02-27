import {Appstate} from "../../types/appstate";

export interface DialogSelector {
    selectDialogStatus: (state: Appstate) => boolean;
}


function selectDialogStatus(state: Appstate): boolean{
    const dialogStatus = state.dialog.status;
    return dialogStatus === 'NOT_STARTED' || dialogStatus === 'LOADING';
}


export default {
    selectDialogStatus
}as DialogSelector