import { VeilederData } from '../../types/veilederdata';
import { Reducer } from 'redux';
import {
    hentAlleVeiledereForEnhetenError,
    hentAlleVeiledereForEnhetenSuccess,
    HentEnhetNavnAction, hentEnhetNavnError, hentEnhetNavnSuccess,
    hentPaloggetVeilederError, hentPaloggetVeilederSuccess,
    HentVeilederPaEnhetenAction, TildelVeilederAction,
    TildelVeilederActions,
    TildelVeilederActionType, tildelVeilederError, tildelVeilederSuccess
} from './actions';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import VeilederApi from '../../api/veileder-api';
import { TildelVeilederResponse } from '../../types/tildel-veileder';
import { VeilederListe } from '../../mock/veiledereliste';
import { FETCH_STATUS } from '../../types/fetch-status';
import { triggerReRenderingAvMao } from '../../app/utils/utils';
import { EnhetData } from '../../types/enhet';

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
    enhet: {
        data: EnhetData;
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
    },
    enhet: {
        data: {
            enhetId: '',
            navn: '',
        },
    },
};

const tildelVelederReducer: Reducer<TildelVeilederState, TildelVeilederActions> = (state = initialState, action) => {
    switch (action.type) {
        case TildelVeilederActionType.HENT_PALOGGET_VEILEDER:
        case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN:
        case TildelVeilederActionType.TILDEL_VEILEDER:
        case TildelVeilederActionType.HENT_ENHET_NAVN:
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
        case TildelVeilederActionType.HENT_ENHET_NAVN_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                enhet: {
                    data: action.data
                }
            };
        }
        case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_ERROR:
        case TildelVeilederActionType.HENT_PALOGGET_VEILEDER_ERROR:
        case TildelVeilederActionType.TILDEL_VEILEDER_ERROR:
        case TildelVeilederActionType.HENT_ENHET_NAVN_ERROR: {
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

function* hentAlleVeiledere(action: HentVeilederPaEnhetenAction) {
    try {
        const response = yield call( () => VeilederApi.hentVeiledereForEnhet(action.enhetId));
        yield put(hentAlleVeiledereForEnhetenSuccess(response));
    } catch (e) {
        yield put(hentAlleVeiledereForEnhetenError(e));
    }
}

function* hentPaloggetVeileder() {
    try {
        const response = yield call( () => VeilederApi.hentVeieldere());
        yield put(hentPaloggetVeilederSuccess(response));
    } catch (e) {
        yield put(hentPaloggetVeilederError(e));
    }
}

function* tildelVeileder(action: TildelVeilederAction) {
    try {
        const response = yield call( () => VeilederApi.tildelTilVeileder(action.data));
        if (response.feilendeTilordninger.length === 0 ) {
            yield put(tildelVeilederSuccess(Object.assign(response, {tilVeilederId : action.data[0].tilVeilederId})));
            triggerReRenderingAvMao();
        }
    } catch (e) {
        yield put(tildelVeilederError(e));
    }
}
function* hentEnhetNavn(action: HentEnhetNavnAction) {
    try {
        const response = yield call(() => VeilederApi.hentEnhetNavn(action.enhetId));
        yield put(hentEnhetNavnSuccess(response));
    } catch (e) {
        yield put(hentEnhetNavnError(e));
    }
}

export function* tildelVeilederSaga() {
    yield takeLatest(TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN, hentAlleVeiledere);
    yield takeLatest(TildelVeilederActionType.HENT_PALOGGET_VEILEDER, hentPaloggetVeileder);
    yield takeLatest(TildelVeilederActionType.TILDEL_VEILEDER, tildelVeileder);
    yield takeLatest(TildelVeilederActionType.HENT_ENHET_NAVN, hentEnhetNavn);
}

export default tildelVelederReducer;