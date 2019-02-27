import {Appstate} from "../../types/appstate";

export interface ArbeidslisteSelector {
    selectArbeidslisteStatus: (state: Appstate) => boolean;
}


function selectArbeidslisteStatus(state: Appstate): boolean{
    const arbeidslisteStatus = state.arbeidsliste.status;
    return arbeidslisteStatus === 'NOT_STARTED' || arbeidslisteStatus === 'LOADING';
}


export default {
    selectArbeidslisteStatus
}as ArbeidslisteSelector