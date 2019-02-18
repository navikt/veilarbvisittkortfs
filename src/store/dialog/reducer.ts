import {OrNothing} from "../../types/utils/ornothing";
import Dialog from "../../types/dialog";
import {Reducer} from "redux";
import {call, put, takeLatest, all, select} from 'redux-saga/effects';
import {
    DialogActions, DialogActionType,
    HenvendelseActionType, oppdaterDialogSuccess,
    OpprettHenvendelseAction, OpprettHenvendelseActionSuccess,
    opprettHenvendelseError,
    opprettHenvendelseSuccess
} from "./actions";
import DialogApi from "../../api/dialog-api";
import OppfolgingApi from "../../api/oppfolging-api";
import PersonaliaSelectors from "../personalia/selectors";

export type DialogState = {data: Dialog} & {isLoading: boolean; error: OrNothing<Error>}


const initialState: DialogState = {
    isLoading:false,
    error: null,
    data: {
        aktvitetId:null,
    egenskaper:[],
    erLestAvBruker: false,
    ferdigBehandlet: false,
    henvendelser:[],
    historisk: false,
    id:"",
    lest:false,
    lestAvBrukerTidspunkt : "",
    opprettetDato: "",
    overskrift: "",
    sisteDato: "",
    sisteTekst:"",
    venterPaSvar:false,
    }
};

const dialogReducer: Reducer<DialogState, DialogActions> = (state = initialState, action) => {
    switch (action.type) {
        case HenvendelseActionType.OPPRETTET_HENVENDELSE: {
            return {...state, isLoading: true}
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS:
        case DialogActionType.OPPDATER_DIALOG_SUCCESS:
            {
            return {
                ...state,
                isLoading:false,
                data: action.data
            }
        }
        case HenvendelseActionType.OPPRETTET_HENVENDELSE_ERROR: {
            return {
                ...state,
                isLoading:false,
                error: action.error
            }
        }

    }
    return state;
};


function* opprettHenvendelse(action: OpprettHenvendelseAction) {
    try {
        const response = yield call( ()=> DialogApi.nyHenvendelse(action.data));
        yield put(opprettHenvendelseSuccess(response));
    } catch (e) {
        yield put(opprettHenvendelseError(e));
    }
}

function* startEskaleringMedDialog(action: OpprettHenvendelseActionSuccess) {
    try {
        const fnr = yield select(PersonaliaSelectors.selectFodselsnummer);

        const [dialogData1, dialogData2, oppfolgingStatus] = yield all([
            DialogApi.oppdaterFerdigbehandlet(action.data.id, true),
            DialogApi.oppdaterVenterPaSvar(action.data.id, true),
            OppfolgingApi.startEskalering(action.data.id, action.data.henvendelser[0].tekst)
        ]);

        const response = yield call (()=> OppfolgingApi.hentOppfolgingData(fnr));

        yield put(oppdaterDialogSuccess(dialogData1));
        yield put(dialogData2);
        yield put(oppfolgingStatus);
        yield put(response);

    } catch(e) {

    }
}


export function* dialogSaga() {
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE, opprettHenvendelse);
    yield takeLatest(HenvendelseActionType.OPPRETTET_HENVENDELSE_SUCCESS, startEskaleringMedDialog);
}

export default dialogReducer;