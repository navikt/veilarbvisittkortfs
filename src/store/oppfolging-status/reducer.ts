import { Reducer } from 'redux';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import { OppfolgingStatus } from '../../types/oppfolging-status';
import {
    HentOppfolgingstatusAction, hentOppfolgingstatusError,
    hentOppfolgingstatusSuccess,
    OppfolgingStatusActions,
    OppfolgingstatusActionType
} from './actions';
import { fetchOppfolgingsstatusData } from '../../api/api';
import { FETCH_STATUS } from '../../types/fetch-status';

export type OppfolgingStatusState = {data: OppfolgingStatus} & {status: FETCH_STATUS; error: OrNothing<Error>};

const initialState: OppfolgingStatusState = {
    status: 'NOT_STARTED',
    error: null,
    data: {
        oppfolgingsenhet: {
            navn: '',
            enhetId: ''},
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
                status: 'LOADING'
            };
        }
        case OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE'
            };
        }
        case OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error
            };
        }
        default:
            return state;
    }
};

function* hentOppfolgingstatus(action: HentOppfolgingstatusAction) {
    try {
        const response = yield call( () => fetchOppfolgingsstatusData(action.fnr));
        yield put(hentOppfolgingstatusSuccess(response));
    } catch (e) {
        yield put(hentOppfolgingstatusError(e));
    }
}

export function* oppfolgingstatusSaga() {
    yield takeLatest(OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS, hentOppfolgingstatus);
}

export default oppfolgingStatusReducer;