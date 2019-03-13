import { OrNothing } from '../../types/utils/ornothing';
import Dialog from '../../types/dialog';
import { Reducer } from 'redux';
import { call, put, takeLatest, all, select } from 'redux-saga/effects';
import {
    DialogActions, DialogActionType,
    HenvendelseActionType, oppdaterDialogSuccess,
    OpprettHenvendelseAction, OpprettHenvendelseActionSuccess,
    opprettHenvendelseError,
    opprettHenvendelseSuccess
} from './actions';
import DialogApi from '../../api/dialog-api';
import OppfolgingApi from '../../api/oppfolging-api';
import { startEskaleringError, startEskaleringSuccess } from '../oppfolging/actions';
import { hentOppfolgingstatusSuccess } from '../oppfolging-status/actions';
import { FETCH_STATUS } from '../../types/fetch-status';
import OppfolgingSelector from "../oppfolging/selector";

export type DialogState = {data: Dialog} & {status: FETCH_STATUS; error: OrNothing<Error>};

const initialState: DialogState = {
    status: 'NOT_STARTED',
    error: null,
    data: {
        aktvitetId: null,
    egenskaper: [],
    erLestAvBruker: false,
    ferdigBehandlet: false,
    henvendelser: [],
    historisk: false,
    id: '',
    lest: false,
    lestAvBrukerTidspunkt : '',
    opprettetDato: '',
    overskrift: '',
    sisteDato: '',
    sisteTekst: '',
    venterPaSvar: false,
    }
};

const dialogReducer: Reducer<DialogState, DialogActions> = (state = initialState, action) => {
    switch (action.type) {
        case HenvendelseActionType.OPPRETTET_HENVENDELSE: {
            return {...state, status: 'LOADING'};
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS:
        case DialogActionType.OPPDATER_DIALOG_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                data: action.data
            };
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error
            };
        }
        default:
            return state;
    }
};

function* opprettHenvendelse(action: OpprettHenvendelseAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call( () => DialogApi.nyHenvendelse(action.data,fnr));
        yield put(opprettHenvendelseSuccess(response));
    } catch (e) {
        yield put(opprettHenvendelseError(e));
    }
}

function* startEskaleringMedDialog(action: OpprettHenvendelseActionSuccess) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);

        const [dialogData1, dialogData2, oppfolgingStatus] = yield all([
            DialogApi.oppdaterFerdigbehandlet(action.data.id, true),
            DialogApi.oppdaterVenterPaSvar(action.data.id, true),
            OppfolgingApi.startEskalering(action.data.id, action.data.henvendelser[0].tekst)
        ]);

        yield put(oppdaterDialogSuccess(dialogData1));
        yield put(oppdaterDialogSuccess(dialogData2));
        yield put(startEskaleringSuccess(oppfolgingStatus));

        const response = yield call (() => OppfolgingApi.hentOppfolgingData(fnr));

        yield put(hentOppfolgingstatusSuccess(response));

    } catch (e) {
        yield put(startEskaleringError(e));
    }
}

export function* dialogSaga() {
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE, opprettHenvendelse);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS, startEskaleringMedDialog);
}

export default dialogReducer;