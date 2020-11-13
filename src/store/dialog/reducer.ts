import { Reducer } from 'redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
    DialogActions,
    DialogActionType,
    hentDialogerError,
    hentDialogerSuccess,
    HenvendelseActionType,
    oppdaterDialogSuccess,
    OpprettHenvendelseAction,
    OpprettHenvendelseActionSuccess,
    opprettHenvendelseError,
    opprettHenvendelseStoppEskaleringSuccess,
    opprettHenvendelseStoppEskaleringError,
    opprettHenvendelseSuccess,
} from './actions';
import DialogApi from '../../api/dialog-api';
import OppfolgingApi from '../../api/oppfolging-api';
import { hentOppfolgingSuccess, startEskaleringError, startEskaleringSuccess } from '../oppfolging/actions';
import OppfolgingSelector from '../oppfolging/selector';
import { navigerAction } from '../navigation/actions';
import { OrNothing } from '../../util/type/ornothing';
import Dialog from '../../api/data/dialog';
import { FETCH_STATUS } from '../../api/data/fetch-status';
import { eskaleringVarselSendtEvent, replaceAt } from '../../util/utils';

export type DialogState = { data: Dialog[] } & { status: FETCH_STATUS; error: OrNothing<Error> };

const initialState: DialogState = {
    status: 'NOT_STARTED',
    error: null,
    data: [],
};

const dialogReducer: Reducer<DialogState, DialogActions> = (state = initialState, action) => {
    switch (action.type) {
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING:
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING:
        case HenvendelseActionType.HENT_DIALOGER: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS:
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_SUCCESS:
        case DialogActionType.OPPDATER_DIALOG_SUCCESS: {
            const dialogIndex = state.data.findIndex((dialog) => dialog.id === action.data.id);
            const dialogData =
                dialogIndex === -1 ? [...state.data, action.data] : replaceAt(state.data, dialogIndex, action.data);
            return {
                ...state,
                status: 'DONE',
                data: dialogData,
            };
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_ERROR:
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING_ERROR:
        case HenvendelseActionType.HENT_DIALOGER_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error,
            };
        }
        case HenvendelseActionType.HENT_DIALOGER_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE',
            };
        }
        default:
            return state;
    }
};

function* opprettHenvendelse(action: OpprettHenvendelseAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => DialogApi.nyHenvendelse(action.data, fnr));
        yield put(opprettHenvendelseSuccess(response, fnr));
    } catch (e) {
        yield put(opprettHenvendelseError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* opprettHenvendelseStoppEskalering(action: OpprettHenvendelseAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => DialogApi.nyHenvendelse(action.data, fnr));
        yield put(opprettHenvendelseStoppEskaleringSuccess(response, fnr));
    } catch (e) {
        yield put(opprettHenvendelseStoppEskaleringError(e));
    }
}

function* startEskaleringMedDialog(action: OpprettHenvendelseActionSuccess): any {
    try {
        const [dialogData1, dialogData2] = yield all([
            DialogApi.oppdaterFerdigbehandlet(action.data.id, true, action.fnr),
            DialogApi.oppdaterVenterPaSvar(action.data.id, true, action.fnr),
            OppfolgingApi.startEskalering(action.data.id, action.data.henvendelser[0].tekst, action.fnr),
        ]);

        yield put(oppdaterDialogSuccess(dialogData1));
        yield put(oppdaterDialogSuccess(dialogData2));
        yield put(startEskaleringSuccess());

        const response = yield call(() => OppfolgingApi.hentOppfolgingData(action.fnr));

        yield put(hentOppfolgingSuccess(response));
        eskaleringVarselSendtEvent();
    } catch (e) {
        yield put(startEskaleringError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* hentDialoger() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => DialogApi.hentDialoger(fnr));
        yield put(hentDialogerSuccess(response));
    } catch (e) {
        yield put(hentDialogerError(e));
    }
}

export function* dialogSaga() {
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING, opprettHenvendelse);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_START_ESKALERING_SUCCESS, startEskaleringMedDialog);
    yield takeLatest(HenvendelseActionType.HENT_DIALOGER, hentDialoger);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_STOPP_ESKALERING, opprettHenvendelseStoppEskalering);
}

export default dialogReducer;
