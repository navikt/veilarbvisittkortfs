import {
    AvsluttOppfolgingAction, avsluttOppfolgingError,
    avsluttOppfolgingSuccess,
    HentOppfolgingAction,
    hentOppfolgingError,
    hentOppfolgingSuccess
} from './actions';
import { hentOppfolgingData } from '../../api/oppfolging-api-utils';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    setDigitalError,
    SettDigitalAction, settDigitalSuccess,
    SettManuellAction,
    settManuellError,
    settManuellSuccess
} from './actions';
import { OppfolgingActionType } from './action-type';
import {
    StartKVPAction,
    startKVPError,
    startKVPSuccess,
    StoppKVPAction, stoppKVPError,
    stoppKVPSuccess
} from './actions';
import OppfolgingApi from '../../api/oppfolging-api';
import OppfolgingSelector from "./selector";
import VeilederSelector from "../tildel-veileder/selector";

function* hentOppfolging(action: HentOppfolgingAction) {
    try {
        const response = yield call( () => hentOppfolgingData(action.fnr));
        yield put(hentOppfolgingSuccess(response));
    } catch (e) {
        yield put(hentOppfolgingError(e));
    }
}

function* settManuell(action: SettManuellAction) {
    try {
        const response = yield call( () => OppfolgingApi.settManuellOppfolging(action.begrunnelse, action.veilederId, action.fnr));
        yield put(settManuellSuccess(response));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr: action.fnr});
    } catch (e) {
        yield put(settManuellError(e));
    }
}

function* settDigital(action: SettDigitalAction) {
    try {
        const response = yield call( () => OppfolgingApi.settDigital(action.begrunnelse, action.veilederId, action.fnr));
        yield put(settDigitalSuccess(response));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr: action.fnr});
    } catch (e) {
        yield put(setDigitalError(e));
    }
}

function* startKVP(action: StartKVPAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        yield call( () => OppfolgingApi.startKvpOppfolging(action.begrunnelse, fnr));
        yield put(startKVPSuccess());
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr});
    } catch (e) {
        yield put(startKVPError(e));
    }
}

function* stopKVP(action: StoppKVPAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        yield call( () => OppfolgingApi.stoppKvpOppfolging(action.begrunnelse, fnr));
        yield put(stoppKVPSuccess());
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr});
    } catch (e) {
        yield put(stoppKVPError(e));
    }
}

function* avsluttOppfolging(action: AvsluttOppfolgingAction) {
    try{
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const veilederId = yield select(VeilederSelector.selectIdentPaloggetVeileder);
        const data = yield call( () => OppfolgingApi.avsluttOppfolging(action.begrunnelse, veilederId,fnr));
        yield put(avsluttOppfolgingSuccess(data));
    } catch (e) {
        yield put(avsluttOppfolgingError(e));
    }
}

export function* oppfolgingSaga() {
    yield takeLatest(OppfolgingActionType.HENT_OPPFOLGING, hentOppfolging);
    yield takeLatest(OppfolgingActionType.SETT_MANUELL, settManuell);
    yield takeLatest(OppfolgingActionType.START_KVP, startKVP);
    yield takeLatest(OppfolgingActionType.STOPP_KVP, stopKVP);
    yield takeLatest(OppfolgingActionType.SETT_DIGITAL, settDigital);
    yield takeLatest(OppfolgingActionType.AVSLUTT_OPPFOLGING, avsluttOppfolging);
}
