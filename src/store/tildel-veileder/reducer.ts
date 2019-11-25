import { VeilederData } from '../../types/veilederdata';
import { Reducer } from 'redux';
import {
  hentAlleVeiledereForEnhetenError,
  hentAlleVeiledereForEnhetenSuccess,
  hentPaloggetVeilederError,
  hentPaloggetVeilederSuccess,
  HentVeilederPaEnhetenAction,
  TildelVeilederAction,
  TildelVeilederActions,
  TildelVeilederActionType,
  tildelVeilederError,
  tildelVeilederSuccess
} from './actions';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import TildelVeilederApi from '../../api/tildel-veileder-api';
import { TildelVeilederResponse } from '../../types/tildel-veileder';
import { VeilederListe } from '../../mock/veiledereliste';
import { FETCH_STATUS } from '../../types/fetch-status';
import { triggerReRenderingAvMao } from '../../app/utils/utils';
import { visFjernTildeltVeilederToast } from '../toast/actions';

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
    data: OrNothing<TildelVeilederResponse>;
    error: OrNothing<Error>;
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
      etternavn: ''
    }
  },
  veilederPaEnheten: {
    data: { veilederListe: [] }
  },
  tildeltVeileder: {
    data: null,
    error: null
  }
};

const tildelVelederReducer: Reducer<TildelVeilederState, TildelVeilederActions> = (state = initialState, action) => {
  switch (action.type) {
    case TildelVeilederActionType.HENT_PALOGGET_VEILEDER:
    case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN:
      return {
        ...state,
        status: 'LOADING'
      };
    case TildelVeilederActionType.TILDEL_VEILEDER:
      return {
        ...state,
        status: 'LOADING',
        tildeltVeileder: {
          error: null,
          data: null
        }
      };
    case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_SUCCESS: {
      return {
        ...state,
        status: 'DONE',
        veilederPaEnheten: {
          data: action.data
        }
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
          error: null,
          data: action.data
        }
      };
    }
    case TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_ERROR:
    case TildelVeilederActionType.HENT_PALOGGET_VEILEDER_ERROR: {
      return {
        ...state,
        status: 'ERROR',
        error: action.error
      };
    }
    case TildelVeilederActionType.TILDEL_VEILEDER_ERROR: {
      return {
        ...state,
        tildeltVeileder: {
          ...state.tildeltVeileder,
          error: action.error
        }
      };
    }
    default:
      return state;
  }
};

function* hentAlleVeileder(action: HentVeilederPaEnhetenAction) {
  try {
    const response = yield call(() => TildelVeilederApi.hentVeiledereForEnhet(action.enhetId));
    yield put(hentAlleVeiledereForEnhetenSuccess(response));
  } catch (e) {
    yield put(hentAlleVeiledereForEnhetenError(e));
  }
}

function* hentPaloggetVeileder() {
  try {
    const response = yield call(() => TildelVeilederApi.hentVeieldere());
    yield put(hentPaloggetVeilederSuccess(response));
  } catch (e) {
    yield put(hentPaloggetVeilederError(e));
  }
}

function* tildelVeileder(action: TildelVeilederAction) {
  try {
    const response = yield call(() => TildelVeilederApi.tildelTilVeileder(action.data));
    if (response.feilendeTilordninger.length > 0) {
      yield put(tildelVeilederError(new Error('Noen brukere kunne ikke tilordnes en veileder')));
    } else {
      yield put(tildelVeilederSuccess(Object.assign(response, { tilVeilederId: action.data[0].tilVeilederId })));
      yield put(visFjernTildeltVeilederToast());
      triggerReRenderingAvMao();
    }
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
