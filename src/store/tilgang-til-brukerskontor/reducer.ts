import { TilgangTilBrukersKontor } from '../../types/tilgangtilbrukerskontor';
import { OrNothing } from '../../types/utils/ornothing';
import { Reducer } from 'redux';
import {
    hentTilgangTilBrukersKontorError,
    hentTilgangTilBrukersKontorSuccess,
    TilgangTilBrukersKontorAction,
    TilgangTilBrukersKontorActions,
    TilgangTilBrukersKontorActionType
} from './actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import OppfolgingApi from '../../api/oppfolging-api';

export type TilgangTilBrukersKontorState = {data: TilgangTilBrukersKontor} & {isLoading: boolean; error: OrNothing<Error>};

const initialState: TilgangTilBrukersKontorState = {
    isLoading: false,
    data : {tilgangTilBrukersKontor: false},
    error: null
};

const tilgangTilBrukersKontorReducer: Reducer<TilgangTilBrukersKontorState, TilgangTilBrukersKontorActions> = (state = initialState, action) => {
    switch (action.type) {
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR: {
            return {
                ...state,
                isLoading: true
            };
        }
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                data: action.data
            };
        }
        case TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
        default:
            return state;
    }
};

function* hentTilgangTilBrukersKontor(action: TilgangTilBrukersKontorAction) {
    try {
        const response = yield call( () => OppfolgingApi.hentVeilederTilgang(action.fnr));
        yield put(hentTilgangTilBrukersKontorSuccess(response));
    } catch (e) {
        yield put(hentTilgangTilBrukersKontorError(e));
    }
}

export function* tilgangTilBrukersKontorSaga() {
   yield takeLatest(TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR, hentTilgangTilBrukersKontor);
}

export default tilgangTilBrukersKontorReducer;