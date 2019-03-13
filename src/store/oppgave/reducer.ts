import {FETCH_STATUS} from "../../types/fetch-status";
import {OrNothing} from "../../types/utils/ornothing";
import {OppgaveHistorikk} from "../../types/oppgave-historikk";
import {call, put, takeLatest, select} from 'redux-saga/effects';
import {Reducer} from "redux";
import {
    HentOppgavehistorikkAction,
    hentOppgavehistorikkError,
    hentOppgavehistorikkSuccess, LagreOppgaveAction, lagreOppgaveError, lagreOppgaveSuccess,
    OppgaveActionType,
    OppgaveHistorikkActions
} from "./actions";
import {InnstillingshistorikActionType} from "../innstillingshistorikk/actions";
import OppfolgingApi from "../../api/oppfolging-api";
import OppfolgingSelector from "../oppfolging/selector";
import OppgaveApi from "../../api/oppgave-api";
import {OppgaveTema, OppgaveType} from "../../types/oppgave";


interface LagetOppgave {
    tema: OppgaveTema,
    type: OppgaveType
}

interface OppgaveData {
    oppgaveHistorikk : OppgaveHistorikk[],
    lagetOppgave?: LagetOppgave
}

export interface  OppgaveHistorikkState {
    data: OppgaveData ;
    status: FETCH_STATUS;
    error: OrNothing<Error>;
};

const initialState:OppgaveHistorikkState = {
    status: 'NOT_STARTED',
    error: null,
    data : {
        oppgaveHistorikk: [] as OppgaveHistorikk[],
    },
};

const oppgavehistorikkReducer: Reducer<OppgaveHistorikkState, OppgaveHistorikkActions> = (state = initialState, action) => {
    switch(action.type) {
        case OppgaveActionType.HENT_OPPGAVEHISTORIKK:
        case  OppgaveActionType.LAGRE_OPPGAVE : {
            return {

                ...state,
                status: 'LOADING'
            }
        }
        case OppgaveActionType.HENT_OPPGAVEHISTORIKK_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: {...state.data, oppgaveHistorikk: action.data}
            }
        }
        case OppgaveActionType.HENT_OPPGAVEHISTORIKK_ERROR:
        case OppgaveActionType.LAGRE_OPPGAVE_ERROR: {
            return {
                ...state,
                error: action.error,
                status: 'ERROR'
            }
        }
        case OppgaveActionType.LAGRE_OPPGAVE_SUCCESS:  {
            return {
                ...state,
                status: 'DONE',
                data: {
                    ...state.data,
                    lagetOppgave: {type : action.data.type, tema: action.data.tema}
                }
            }
        }
        default:
            return state;
    }
};

function* hentInstillingshistorikk(action: HentOppgavehistorikkAction) {
    try {
        const response = yield call( () => OppfolgingApi.hentInnstillingsHistorikk(action.fnr));
        yield put(hentOppgavehistorikkSuccess(response));
    } catch (e) {
        yield put(hentOppgavehistorikkError(e));
    }
}

function* lagreOppgave(action: LagreOppgaveAction) {
    const fnr = yield select(OppfolgingSelector.selectFnr);
    try {
        const response = yield call( () => OppgaveApi.lagreOppgave(fnr, action.data));
        yield put(lagreOppgaveSuccess(response));
    } catch (e) {
        yield put(lagreOppgaveError(e));
    }
}


export function* oppgaveHistorikkSaga() {
    yield takeLatest(InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK, hentInstillingshistorikk);
    yield takeLatest(OppgaveActionType.LAGRE_OPPGAVE, lagreOppgave);
}



export default oppgavehistorikkReducer;