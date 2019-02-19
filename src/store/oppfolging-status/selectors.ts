import { Appstate } from '../../types/appstate';
import { OppfolgingStatus } from '../../types/oppfolging-status';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface OppfolgingsstatusSelector {
    selectOppfolgingslice: (state: Appstate) => OppfolgingStatus;
    selectOppfolgingsenhetsId: (state: Appstate) => StringOrNothing;
}

function selectOppfolgingslice(state: Appstate): OppfolgingStatus {
    return state.oppfolgingstatus.data;
}

function selectOppfolgingsenhetsId(state: Appstate): StringOrNothing {
    return selectOppfolgingslice(state).oppfolgingsenhet.enhetId;
}

export default {
    selectOppfolgingslice,
    selectOppfolgingsenhetsId
} as OppfolgingsstatusSelector;