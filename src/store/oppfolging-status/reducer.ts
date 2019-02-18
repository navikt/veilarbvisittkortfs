import {Reducer} from "redux";
import {OrNothing} from "../../types/utils/ornothing";
import {call, put, takeLatest} from 'redux-saga/effects';
import {OppfolgingStatus} from "../../types/oppfolging-status";
import {
    HentOppfolgingstatusAction, hentOppfolgingstatusError,
    hentOppfolgingstatusSuccess,
    OppfolgingStatusActions,
    OppfolgingstatusActionType
} from "./actions";
import {fetchOppfolgingsstatusData} from "../../api/api";

export type OppfolgingStatusState = {data: OppfolgingStatus} & {isLoading: boolean; error: OrNothing<Error>}

const initialState: OppfolgingStatusState = {
    isLoading:false,
    error: null,
    data: {
        oppfolgingsenhet: {
            navn: "NAV TestHeim",
            enhetId: "007"},
        veilederId: null,
        formidlingsgruppe: null,
        servicegruppe: null,
    }
};


const oppfolgingStatusReducer: Reducer<OppfolgingStatusState, OppfolgingStatusActions> = (state = initialState, action) => {
    switch (action.type) {
        case OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS: {
            return {
                ...state,
                isLoading: true
            };
        }
        case OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
    }
    return state;
};

function* hentOppfolgingstatus(action: HentOppfolgingstatusAction) {
    try {
        const response = yield call( ()=> fetchOppfolgingsstatusData(action.fnr));
        yield put(hentOppfolgingstatusSuccess(response));
    } catch (e) {
        yield put(hentOppfolgingstatusError(e));
    }
}


export function* oppfolgingstatusSaga() {
    yield takeLatest(OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS, hentOppfolgingstatus);
}

export default oppfolgingStatusReducer;