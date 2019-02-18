import {Reducer} from "redux";
import {
    HentOppfolgingAction,
    hentOppfolgingError,
    hentOppfolgingSuccess,
    OppfolgingActions,
    OppfolgingActionType
} from "./actions";
import {Oppfolging} from "../../types/oppfolging";
import {OrNothing} from "../../types/utils/ornothing";
import {hentOppfolgingData} from "../../api/oppfolging-api-utils";
import { call, put, takeLatest } from 'redux-saga/effects';

export type OppfogingState = {data: Oppfolging} & {isLoading: boolean; error: OrNothing<Error>}

const initialState: OppfogingState = {
    isLoading:false,
    error: null,
    data: {
        avslutningStatus: null,
        erIkkeArbeidssokerUtenOppfolging:false,
        erSykmeldtMedArbeidsgiver:false,
        fnr:"",
        gjeldeneEskaleringsvarsel: null,
        harSkriveTilgang:false,
        inaktivtIArena:false,
        inaktiveringsdato: null,
        kanReaktiveras: false,
        kanStarteOppfolging:false,
        manuell: false,
        oppfolgingUtgang: null,
        oppfolgingsPerioder:[],
        reservarsjonKRR:false,
        underKvp:false,
        underOppfolging:false,
        veilederId: null,
        vilkarMaBesvarel:false,
    }
};


const oppfolgingReducer: Reducer<OppfogingState, OppfolgingActions> = (state = initialState, action) => {
    switch (action.type) {
        case OppfolgingActionType.HENT_OPPFOLGING:
        case OppfolgingActionType.START_ESKALERING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case OppfolgingActionType.HENT_OPPFOLGING_SUCCESS:
        case OppfolgingActionType.START_ESKALERING_SUCCESS:
            {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case OppfolgingActionType.HENT_OPPFOLGING_ERROR:
        case OppfolgingActionType.START_ESKALERING_ERROR:
            {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
    }
    return state;
};

function* hentOppfolging(action: HentOppfolgingAction) {
    try {
        const response = yield call( ()=> hentOppfolgingData(action.fnr));
        yield put(hentOppfolgingSuccess(response));
    } catch (e) {
        yield put(hentOppfolgingError(e));
    }
}


export function* oppfolgingSaga() {
    yield takeLatest(OppfolgingActionType.HENT_OPPFOLGING, hentOppfolging);
}

export default oppfolgingReducer;