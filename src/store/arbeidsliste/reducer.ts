import {Arbeidsliste} from "../../types/arbeidsliste";
import {Reducer} from "redux";
import {OrNothing} from "../../types/utils/ornothing";
import {call, put, takeLatest} from 'redux-saga/effects';
import {
    ArbeidslisteActions,
    ArbeidslisteActionType,
    HentArbeidslisteAction,
    hentArbeidslisteError,
    hentArbeidslisteSuccess
} from "./actions";
import {fetchArbeidslisteData} from "../../api/api";

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
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR: {
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
        const response = yield call( ()=> fetchArbeidslisteData(action.fnr));
        yield put(hentArbeidslisteSuccess(response));
    } catch (e) {
        yield put(hentArbeidslisteError(e));
    }
}


export function* arbeidslisteSaga() {
    yield takeLatest(ArbeidslisteActionType.HENT_ARBEIDSLISTE, hentArbeidsliste);
}

export default arbeidslisteReducer;