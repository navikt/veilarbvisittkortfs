import { VeilederData } from '../../types/veilederdata';
import { Reducer } from 'redux';
import {
    hentAlleVeiledereForEnhetenError,
    hentAlleVeiledereForEnhetenSuccess,
    hentPaloggetVeilederError,
    hentPaloggetVeilederSuccess,
    HentVeilederPaEnhetenAction, TildelVeilederAction,
    TildelVeilederActions,
    TildelVeilederActionType, tildelVeilederError, tildelVeilederSuccess
} from './actions';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import TildelVeilederApi from '../../api/tildel-veileder-api';
import { TildelVeilederResponse} from '../../types/tildel-veileder';
import { VeilederListe } from '../../mock/veiledereliste';
import {FETCH_STATUS} from "../../types/fetch-status";

export interface TildelVeilederState {
    status: FETCH_STATUS;
    error: OrNothing<Error>;
    paloggetVeileder: {
        data: VeilederData;
    };
    veilederPaEnheten: {
        data: VeilederListe;
    };
    tildeltVeileder: {
        data: OrNothing<TildelVeilederResponse>
    };
}

const initialState: TildelVeilederState = {
    status: 'NOT_STARTED',
    error: null,
    paloggetVeileder: {
        data: {
            ident: '',
            navn: '',
            fornavn: '',
            etternavn: '',
        },
    },
    veilederPaEnheten: {
        data: {veilederListe: []},
    },
    tildeltVeileder: {
        data: null,
    }
};

const tildelVelederReducer: Reducer<TildelVeilederState, TildelVeilederActions> = (state = initialState, action) => {
    switch (action.type) {
        case TildelVeilederActionType.HENT_PALOGGET_VEILEDER:
        case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN:
        case TildelVeilederActionType.TILDEL_VEILEDER:
            return {
                status: 'LOADING',
                ...state
            };
        case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                veilederPaEnheten: {
                    data : action.data
                },
            };
        }
        case TildelVeilederActionType.HENT_PALOGGET_VEILEDER_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                paloggetVeileder: {
                    data: action.data
                }
            };
        }
        case TildelVeilederActionType.TILDEL_VEILEDER_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                tildeltVeileder: {
                    data: action.data
                },
            };
        }
        case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_ERROR:
        case TildelVeilederActionType.HENT_PALOGGET_VEILEDER_ERROR:
        case TildelVeilederActionType.TILDEL_VEILEDER_ERROR: {
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

function* hentAlleVeileder(action: HentVeilederPaEnhetenAction) {
    try {
        const response = yield call( () => TildelVeilederApi.hentVeieldereForEnhet(action.enhetId));
        yield put(hentAlleVeiledereForEnhetenSuccess(response));
    } catch (e) {
        yield put(hentAlleVeiledereForEnhetenError(e));
    }
}

function* hentPaloggetVeileder() {
    try {
        const response = yield call( () => TildelVeilederApi.hentVeieldere());
        yield put(hentPaloggetVeilederSuccess(response));
    } catch (e) {
        yield put(hentPaloggetVeilederError(e));
    }
}

function* tildelVeileder(action: TildelVeilederAction) {
    try {
        const response = yield call( () => TildelVeilederApi.tildelTilVeileder(action.data));
        yield put(tildelVeilederSuccess(response));
    } catch (e) {
        yield put(tildelVeilederError(e));
    }
}

export function* tildelVeilederSaga() {
    yield takeLatest(TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN, hentAlleVeileder);
    yield takeLatest(TildelVeilederActionType.HENT_PALOGGET_VEILEDER, hentPaloggetVeileder);
    yield takeLatest(TildelVeilederActionType.TILDEL_VEILEDER, tildelVeileder);
}

export default tildelVelederReducer;