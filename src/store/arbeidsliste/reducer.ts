import { Arbeidsliste } from '../../types/arbeidsliste';
import { Reducer } from 'redux';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    ArbeidslisteActions,
    ArbeidslisteActionType,
    HentArbeidslisteAction,
    hentArbeidslisteError,
    hentArbeidslisteSuccess,
    OppdaterArbeidslisteAction,
    oppdaterArbeidslisteError,
    oppdaterArbeidslisteSuccess, SlettArbeidslisteAction, slettArbeidslisteActionError, slettArbeidslisteActionSuccess
} from './actions';
import PersonaliaSelectors from '../personalia/selectors';
import ArbeidslisteApi from '../../api/arbeidsliste-api';

export type ArbeidslisteState = {data: Arbeidsliste} & {isLoading: boolean; error: OrNothing<Error>};

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
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE:
        case ArbeidslisteActionType.SLETT_ARBEIDSLISTE: {
            return {
                ...state,
                isLoading: true
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS:
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_SUCESS:
        case ArbeidslisteActionType.SLETT_ARBEIDSLISTE_SUCCESS: {
            return {
                ...state,
                data: action.data,
                isLoading: false
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.SLETT_ARBEIDSLISTE_ERROR: {
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        }
        default:
            return state;
    }
};

function* hentArbeidsliste(action: HentArbeidslisteAction) {
    try {
        const response = yield call( () => ArbeidslisteApi.fetchArbeidslisteData(action.fnr));
        yield put(hentArbeidslisteSuccess(response));
    } catch (e) {
        yield put(hentArbeidslisteError(e));
    }
}

function* lagreArbeidsliste(action: OppdaterArbeidslisteAction) {
    try {
        const fnr = yield select(PersonaliaSelectors.selectFodselsnummer);
        const arbeidslisteForm = Object.assign({fnr}, action.arbeidsliste);
        const response = yield call( () => ArbeidslisteApi.lagreArbeidsliste(fnr, [arbeidslisteForm]));
        yield put(oppdaterArbeidslisteSuccess(response));
    } catch (e) {
        yield put(oppdaterArbeidslisteError(e));
    }
}

function* slettArbeidsliste(action: SlettArbeidslisteAction) {
    try {
        const response = yield call( () => ArbeidslisteApi.slettArbeidsliste(action.fnr));
        yield put(slettArbeidslisteActionSuccess(response));
    } catch (e) {
        yield put(slettArbeidslisteActionError(e));
    }
}

export function* arbeidslisteSaga() {
    yield takeLatest(ArbeidslisteActionType.HENT_ARBEIDSLISTE, hentArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE, lagreArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.SLETT_ARBEIDSLISTE, slettArbeidsliste);
}

export default arbeidslisteReducer;