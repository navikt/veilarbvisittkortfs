import { Appstate } from '../../types/appstate';
import { OppfolgingStatus } from '../../types/oppfolging-status';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface OppfolgingsstatusSelector {
    selectOppfolgingStatusData: (state: Appstate) => OppfolgingStatus;
    selectOppfolgingsenhetsId: (state: Appstate) => StringOrNothing;
    selectOppfolgingStatusStatus: (state: Appstate) => boolean;
}

function selectOppfolgingStatusData(state: Appstate): OppfolgingStatus {
    return state.oppfolgingstatus.data;
}

function selectOppfolgingsenhetsId(state: Appstate): StringOrNothing {
    return selectOppfolgingStatusData(state).oppfolgingsenhet.enhetId;
}

function selectOppfolgingStatusStatus (state: Appstate): boolean {
    const oppfolgingStatus = state.oppfolgingstatus.status;
    return oppfolgingStatus === 'NOT_STARTED' ||oppfolgingStatus === 'LOADING';
}


export default {
    selectOppfolgingStatusData,
    selectOppfolgingsenhetsId,
    selectOppfolgingStatusStatus
} as OppfolgingsstatusSelector;