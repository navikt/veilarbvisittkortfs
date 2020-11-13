import { Appstate } from '../../types/appstate';
import { StringOrNothing } from '../../util/type/stringornothings';
import { OppfolgingStatus } from '../../api/data/oppfolging-status';

export interface OppfolgingsstatusSelector {
    selectOppfolgingStatusData: (state: Appstate) => OppfolgingStatus;
    selectOppfolgingsenhetsId: (state: Appstate) => StringOrNothing;
    selectOppfolgingStatusStatus: (state: Appstate) => boolean;
    selectOppfolgingsVeileder: (state: Appstate) => StringOrNothing;
    selectErSykemeldtMedArbeidsgiver: (state: Appstate) => boolean;
}

function selectOppfolgingStatusData(state: Appstate): OppfolgingStatus {
    return state.oppfolgingstatus.data;
}

function selectOppfolgingsVeileder(state: Appstate): StringOrNothing {
    return selectOppfolgingStatusData(state).veilederId;
}

function selectOppfolgingsenhetsId(state: Appstate): StringOrNothing {
    return selectOppfolgingStatusData(state).oppfolgingsenhet.enhetId;
}

function selectOppfolgingStatusStatus(state: Appstate): boolean {
    const oppfolgingStatus = state.oppfolgingstatus.status;
    return oppfolgingStatus === 'NOT_STARTED' || oppfolgingStatus === 'LOADING';
}

function selectErSykemeldtMedArbeidsgiver(state: Appstate): boolean {
    const data = selectOppfolgingStatusData(state);
    return data.formidlingsgruppe === 'IARBS' && data.servicegruppe === 'VURDI';
}

export default {
    selectOppfolgingStatusData,
    selectOppfolgingsenhetsId,
    selectOppfolgingStatusStatus,
    selectOppfolgingsVeileder,
    selectErSykemeldtMedArbeidsgiver,
} as OppfolgingsstatusSelector;
