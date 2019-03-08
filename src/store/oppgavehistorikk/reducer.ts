import {FETCH_STATUS} from "../../types/fetch-status";
import {OrNothing} from "../../types/utils/ornothing";
import {OppgaveHistorikk} from "../../types/oppgave-historikk";
import { call, put, takeLatest} from 'redux-saga/effects';
import {Reducer} from "redux";
import {
    HentOppgavehistorikkAction, hentOppgavehistorikkError,
    hentOppgavehistorikkSuccess,
    OppgaveHistorikkActions,
    OppgaveHistorikkActionType
} from "./actions";
import {InnstillingshistorikActionType} from "../innstillingshistorikk/actions";
import OppfolgingApi from "../../api/oppfolging-api";

export type OppgaveHistorikkState = {data: OppgaveHistorikk[]} & {status: FETCH_STATUS, error: OrNothing<Error>};

const initialState: OppgaveHistorikkState = {
    status: 'NOT_STARTED',
    data : [],
    error: null
};

const oppgavehistorikkReducer: Reducer<OppgaveHistorikkState, OppgaveHistorikkActions> = (state = initialState, action) => {
    switch(action.type) {
        case OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK: {
            return {

                ...state,
                status: 'LOADING'
            }
        }
        case OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_SUCCESS: {
                return {
                    ...state,
                    status: 'DONE',
                    data: action.data
                }
            }
        case OppgaveHistorikkActionType.HENT_OPPGAVEHISTORIKK_ERROR: {
                return {
                    ...state,
                    error: action.error,
                    status: 'ERROR'
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


export function* oppgaveHistorikkSaga() {
    yield takeLatest(InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK, hentInstillingshistorikk);
}



export default oppgavehistorikkReducer;