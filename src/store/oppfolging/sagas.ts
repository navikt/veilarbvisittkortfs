import {
    avsluttOppfolgingError,
    avsluttOppfolgingSuccess,
    HentOppfolgingAction,
    hentOppfolgingError,
    hentOppfolgingSuccess,
    StoppEskaleringAction,
    stoppEskaleringError,
    stoppEskaleringSuccess
} from './actions';
import { hentOppfolgingData } from '../../api/oppfolging-api-utils';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    setDigitalError,
    SettDigitalAction,
    settDigitalSuccess,
    SettManuellAction,
    settManuellError,
    settManuellSuccess
} from './actions';
import { OppfolgingActionType } from './action-type';
import {
    StartKVPAction,
    startKVPError,
    startKVPSuccess,
    StoppKVPAction,
    stoppKVPError,
    stoppKVPSuccess
} from './actions';
import OppfolgingApi from '../../api/oppfolging-api';
import OppfolgingSelector from './selector';
import VeilederSelector from '../tildel-veileder/selector';
import AvsluttOppfolgingStatusSelector from '../avslutningstatus/selector';
import { navigerAction } from '../navigation/actions';
import {
    dispatchOppfolgingAvslutet,
    triggerReRenderingAvAktivitesplan,
    triggerReRenderingAvMao
} from '../../app/utils/utils';
import { opprettHenvendelseStoppEskalering } from '../dialog/actions';

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
        yield put(settManuellSuccess(action.begrunnelse, response));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr: action.fnr});
        triggerReRenderingAvMao();
    } catch (e) {
        yield put(settManuellError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* settDigital(action: SettDigitalAction) {
    try {
        const response = yield call( () => OppfolgingApi.settDigital(action.begrunnelse, action.veilederId, action.fnr));
        yield put(settDigitalSuccess(action.begrunnelse, response));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr: action.fnr});
        triggerReRenderingAvMao();
    } catch (e) {
        yield put(setDigitalError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
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
        yield put(navigerAction('feil_i_veilederverktoy'));
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
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* stoppEskalering(action: StoppEskaleringAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        if (action.skallSendeHenvdelse && action.begrunnelse) {
            yield put (opprettHenvendelseStoppEskalering({
                begrunnelse: action.begrunnelse,
                egenskaper: ['ESKALERINGSVARSEL'],
                dialogId: action.dialogId,
                tekst: action.begrunnelse}));
        }
        const response = yield call( () => OppfolgingApi.stoppEskalering(fnr, action.begrunnelse));
        yield put(stoppEskaleringSuccess(response));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr});
        triggerReRenderingAvAktivitesplan();
    } catch (e) {
        yield put(stoppEskaleringError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* avsluttOppfolging() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const begrunnelse = yield select(AvsluttOppfolgingStatusSelector.selectBegrunnelse);
        const veilederId = yield select(VeilederSelector.selectIdentPaloggetVeileder);

        const data = yield call( () => OppfolgingApi.avsluttOppfolging(begrunnelse, veilederId, fnr));
        yield put(avsluttOppfolgingSuccess(data));
        yield put({type: OppfolgingActionType.HENT_OPPFOLGING, fnr});
        dispatchOppfolgingAvslutet();
    } catch (e) {
        yield put(avsluttOppfolgingError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

export function* oppfolgingSaga() {
    yield takeLatest(OppfolgingActionType.HENT_OPPFOLGING, hentOppfolging);
    yield takeLatest(OppfolgingActionType.SETT_MANUELL, settManuell);
    yield takeLatest(OppfolgingActionType.START_KVP, startKVP);
    yield takeLatest(OppfolgingActionType.STOPP_KVP, stopKVP);
    yield takeLatest(OppfolgingActionType.SETT_DIGITAL, settDigital);
    yield takeLatest(OppfolgingActionType.AVSLUTT_OPPFOLGING, avsluttOppfolging);
    yield takeLatest(OppfolgingActionType.STOPP_ESKALERING, stoppEskalering);
}
