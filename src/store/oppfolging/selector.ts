import { Appstate } from '../../types/appstate';

export interface OppfolgingSelector {
    selectoppfolgingStatus: (state: Appstate) => boolean;
}

function selectoppfolgingStatus(state: Appstate): boolean {
    const oppfolgingStatus = state.oppfolging.status;
    return oppfolgingStatus === 'NOT_STARTED' || oppfolgingStatus === 'LOADING';
}

export default {
    selectoppfolgingStatus
}as OppfolgingSelector;