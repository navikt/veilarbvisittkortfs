import { FETCH_STATUS } from '../../types/fetch-status';
import { InnstillingsHistorikk } from '../../types/innstillings-historikk';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Reducer } from 'redux';
import {
    HentInnstillinghistorikAction,
    hentInstillingshistorikkError,
    hentInstillingshistorikkSuccess,
    InnstillingshistorikActions,
    InnstillingshistorikActionType,
} from './actions';
import OppfolgingApi from '../../api/oppfolging-api';
import { OrNothing } from '../../util/type/ornothing';

export type InnstillingsHistorikkState = { data: InnstillingsHistorikk[] } & {
    status: FETCH_STATUS;
    error: OrNothing<Error>;
};

const initialState: InnstillingsHistorikkState = {
    status: 'NOT_STARTED',
    data: [],
    error: null,
};

const instillingshistorikkReducer: Reducer<InnstillingsHistorikkState, InnstillingshistorikActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: action.data,
            };
        }
        case InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_ERROR: {
            return {
                ...state,
                error: action.error,
                status: 'ERROR',
            };
        }
        default:
            return state;
    }
};

function* hentInstillingshistorikk(action: HentInnstillinghistorikAction) {
    try {
        const response = yield call(() => OppfolgingApi.hentInnstillingsHistorikk(action.fnr));
        yield put(hentInstillingshistorikkSuccess(response));
    } catch (e) {
        yield put(hentInstillingshistorikkError(e));
    }
}

export function* instillingshistorikkSaga() {
    yield takeLatest(InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK, hentInstillingshistorikk);
}

export default instillingshistorikkReducer;
