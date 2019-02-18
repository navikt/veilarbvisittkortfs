import {Arbeidsliste} from "../../types/arbeidsliste";
import {Reducer} from "redux";
import {OrNothing} from "../../types/utils/ornothing";
import {call, put, takeLatest, select} from 'redux-saga/effects';
import {
    ArbeidslisteActions,
    ArbeidslisteActionType,
    HentArbeidslisteAction,
    hentArbeidslisteError,
    hentArbeidslisteSuccess, OppdaterArbeidslisteAction, oppdaterArbeidslisteError, oppdaterArbeidslisteSuccess
} from "./actions";
import PersonaliaSelectors from "../personalia/selectors";
import ArbeidslisteApi from "../../api/arbeidsliste-api";

export type ArbeidslisteState = {data: Arbeidsliste} & {isLoading: boolean; error: OrNothing<Error>}

const initialState: ArbeidslisteState = {
    data: {
        arbeidslisteAktiv: null,
        endringstidspunkt: null,
        frist: null,
        harVeilederTilgang: true,
        isOppfolgendeVeileder: true,
        kommentar: null,
        overskrift: null,
        sistEndretAv: null,
        veilederId: null,
    },
    isLoading: false,
    error: null
};


const arbeidslisteReducer: Reducer<ArbeidslisteState, ArbeidslisteActions> = (state = initialState, action) => {
    switch (action.type) {
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE:
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE:{
            return {
                ...state,
                isLoading: true
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS:
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_SUCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
    }
    return state;
};

function* hentArbeidsliste(action: HentArbeidslisteAction) {
    try {
        const response = yield call( ()=> ArbeidslisteApi.fetchArbeidslisteData(action.fnr));
        yield put(hentArbeidslisteSuccess(response));
    } catch (e) {
        yield put(hentArbeidslisteError(e));
    }
}

function* lagreArbeidsliste(action: OppdaterArbeidslisteAction) {
    try {
        const fnr = yield select(PersonaliaSelectors.selectFodselsnummer);
        const response = yield call( ()=> ArbeidslisteApi.lagreArbeidsliste(fnr,action.arbeidsliste));
        yield put(oppdaterArbeidslisteSuccess(response));
    } catch (e) {
        yield put(oppdaterArbeidslisteError(e));
    }
}


export function* arbeidslisteSaga() {
    yield takeLatest(ArbeidslisteActionType.HENT_ARBEIDSLISTE, hentArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE, lagreArbeidsliste);
}

export default arbeidslisteReducer;