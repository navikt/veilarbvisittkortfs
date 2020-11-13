import { FETCH_STATUS } from '../../types/fetch-status';
import { Reducer } from 'redux';
import { AvslutningStatus } from '../../types/oppfolging';
import {
    AvsluttOppfolgingActions,
    AvsluttOppfolgingType,
    hentAvsluttningStatusError,
    hentAvsluttningStatusSuccess,
} from './actions';
import OppfolgingSelector from '../oppfolging/selector';
import OppfolgingApi from '../../api/oppfolging-api';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { OrNothing } from '../../util/type/ornothing';
import { StringOrNothing } from '../../util/type/stringornothings';

export type AvsluttOppfolgingState = { data: OrNothing<AvslutningStatus>; begrunnelse: StringOrNothing } & {
    status: FETCH_STATUS;
    error: OrNothing<Error>;
};

const initialState: AvsluttOppfolgingState = {
    data: null,
    status: 'NOT_STARTED',
    error: null,
    begrunnelse: null,
};

const avsluttOppfolgingStatusReducer: Reducer<AvsluttOppfolgingState, AvsluttOppfolgingActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: action.data,
            };
        }
        case AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error,
            };
        }
        case AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_RESET: {
            return initialState;
        }
        case AvsluttOppfolgingType.LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE: {
            return {
                ...state,
                begrunnelse: action.begrunnelse,
            };
        }
        default:
            return state;
    }
};

function* hentAvsluttOppfolgingStatus() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const data = yield call(() => OppfolgingApi.kanAvslutte(fnr));
        yield put(hentAvsluttningStatusSuccess(data.avslutningStatus));
    } catch (e) {
        yield put(hentAvsluttningStatusError(e));
    }
}

export function* avsluttOppfolgingStatusSaga() {
    yield takeLatest(AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS, hentAvsluttOppfolgingStatus);
}

export default avsluttOppfolgingStatusReducer;
