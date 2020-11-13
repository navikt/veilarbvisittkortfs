import { TilgangTilBrukersKontor } from '../../types/tilgangtilbrukerskontor';
import { Reducer } from 'redux';
import {
    hentTilgangTilBrukersKontorError,
    hentTilgangTilBrukersKontorSuccess,
    TilgangTilBrukersKontorAction,
    TilgangTilBrukersKontorActions,
    TilgangTilBrukersKontorActionType,
} from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import OppfolgingApi from '../../api/oppfolging-api';
import { FETCH_STATUS } from '../../types/fetch-status';
import { OrNothing } from '../../util/type/ornothing';

export type TilgangTilBrukersKontorState = { data: TilgangTilBrukersKontor } & {
    status: FETCH_STATUS;
    error: OrNothing<Error>;
};

const initialState: TilgangTilBrukersKontorState = {
    status: 'NOT_STARTED',
    data: { tilgangTilBrukersKontor: false },
    error: null,
};

const tilgangTilBrukersKontorReducer: Reducer<TilgangTilBrukersKontorState, TilgangTilBrukersKontorActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: action.data,
            };
        }
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error,
            };
        }
        default:
            return state;
    }
};

function* hentTilgangTilBrukersKontor(action: TilgangTilBrukersKontorAction) {
    try {
        const response = yield call(() => OppfolgingApi.hentVeilederTilgang(action.fnr));
        yield put(hentTilgangTilBrukersKontorSuccess(response));
    } catch (e) {
        yield put(hentTilgangTilBrukersKontorError(e));
    }
}

export function* tilgangTilBrukersKontorSaga() {
    yield takeLatest(TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR, hentTilgangTilBrukersKontor);
}

export default tilgangTilBrukersKontorReducer;
