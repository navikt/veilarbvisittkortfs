import { OrNothing } from '../../types/utils/ornothing';
import Dialog from '../../types/dialog';
import { Reducer } from 'redux';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import {
    DialogActions,
    DialogActionType, hentDialogerError, hentDialogerSuccess,
    HenvendelseActionType,
    oppdaterDialogSuccess,
    OpprettHenvendelseAction,
    OpprettHenvendelseActionSuccess,
    opprettHenvendelseError,
    opprettHenvendelseSuccess
} from './actions';
import DialogApi from '../../api/dialog-api';
import OppfolgingApi from '../../api/oppfolging-api';
import { startEskaleringError, startEskaleringSuccess } from '../oppfolging/actions';
import { hentOppfolgingstatusSuccess } from '../oppfolging-status/actions';
import { FETCH_STATUS } from '../../types/fetch-status';
import OppfolgingSelector from '../oppfolging/selector';
import { replaceAt } from '../../app/utils/utils';
import { navigerAction } from '../navigation/actions';

export type DialogState = {data: Dialog[]} & {status: FETCH_STATUS; error: OrNothing<Error>};

const initialState: DialogState = {
    status: 'NOT_STARTED',
    error: null,
    data: [],
};

const dialogReducer: Reducer<DialogState, DialogActions> = (state = initialState, action) => {
    switch (action.type) {
        case HenvendelseActionType.OPPRETTET_HENVENDELSE:
        case HenvendelseActionType.HENT_DIALOGER: {
            return {
                ...state,
                status: 'LOADING'
            };
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS:
        case DialogActionType.OPPDATER_DIALOG_SUCCESS: {
            const dialogIndex = state.data.findIndex(dialog => dialog.id === action.data.id);
            const dialogData = dialogIndex === -1 ?
                [...state.data, action.data] : replaceAt(state.data, dialogIndex, action.data);
            return {
                ...state,
                status: 'DONE',
                data: dialogData
            };
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_ERROR:
        case HenvendelseActionType.HENT_DIALOGER_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error
            };
        }
        case HenvendelseActionType.HENT_DIALOGER_SUCCESS : {
            return {
                ...state,
                data: action.data,
                status: 'DONE'
            };
        }
        default:
            return state;
    }
};

function* opprettHenvendelse(action: OpprettHenvendelseAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call( () => DialogApi.nyHenvendelse(action.data, fnr));
        yield put(opprettHenvendelseSuccess(response, fnr));
    } catch (e) {
        yield put(opprettHenvendelseError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* startEskaleringMedDialog(action: OpprettHenvendelseActionSuccess) {
    try {

        const [dialogData1, dialogData2, oppfolgingStatus] = yield all([
            DialogApi.oppdaterFerdigbehandlet(action.data.id, true, action.fnr),
            DialogApi.oppdaterVenterPaSvar(action.data.id, true, action.fnr),
            OppfolgingApi.startEskalering(action.data.id, action.data.henvendelser[0].tekst, action.fnr)
        ]);

        yield put(oppdaterDialogSuccess(dialogData1));
        yield put(oppdaterDialogSuccess(dialogData2));
        yield put(startEskaleringSuccess(oppfolgingStatus));

        const response = yield call (() => OppfolgingApi.hentOppfolgingData(action.fnr));

        yield put(hentOppfolgingstatusSuccess(response));

    } catch (e) {
        yield put(startEskaleringError(e));
        yield put(navigerAction('feil_i_veilederverktoy'));
    }
}

function* hentDialoger() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call( () => DialogApi.hentDialoger(fnr));
        yield put(hentDialogerSuccess(response));
    } catch (e) {
        yield put(hentDialogerError(e));
    }
}

export function* dialogSaga() {
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE, opprettHenvendelse);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS, startEskaleringMedDialog);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS, startEskaleringMedDialog);
    yield takeLatest(HenvendelseActionType.HENT_DIALOGER, hentDialoger);
}

export default dialogReducer;