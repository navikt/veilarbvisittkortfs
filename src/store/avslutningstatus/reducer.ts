import { FETCH_STATUS } from '../../types/fetch-status';
import { OrNothing } from '../../types/utils/ornothing';
import { Reducer } from 'redux';
import { AvslutningStatus } from '../../types/oppfolging';
import {
    AvsluttOppfolgingActions,
    avsluttOppfolgingError,
    avsluttOppfolgingSuccess,
    AvsluttOppfolgingType,
    hentAvsluttningStatusError,
    hentAvsluttningStatusSuccess,
} from './actions';
import OppfolgingSelector from '../oppfolging/selector';
import OppfolgingApi from '../../api/oppfolging-api';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { StringOrNothing } from '../../types/utils/stringornothings';
import AvsluttOppfolgingStatusSelector from './selector';
import VeilederSelector from '../tildel-veileder/selector';
import { navigerAction } from '../navigation/actions';

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
        case AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_SUCCESS:
        case AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: action.data,
            };
        }
        case AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_ERROR:
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
        yield put(hentAvsluttningStatusSuccess(data));
    } catch (e) {
        yield put(hentAvsluttningStatusError(e));
    }
}

function* avsluttOppfolging() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const begrunnelse = yield select(AvsluttOppfolgingStatusSelector.selectBegrunnelse);
        const veilederId = yield select(VeilederSelector.selectIdentPaloggetVeileder);
        const data = yield call(() => OppfolgingApi.avsluttOppfolging(begrunnelse, veilederId, fnr));
        yield put(avsluttOppfolgingSuccess(data));
    } catch (e) {
        yield put(avsluttOppfolgingError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

export function* avsluttOppfolgingStatusSaga() {
    yield takeLatest(AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS, hentAvsluttOppfolgingStatus);
    yield takeLatest(AvsluttOppfolgingType.AVSLUTT_OPPFOLGING, avsluttOppfolging);
}

export default avsluttOppfolgingStatusReducer;
