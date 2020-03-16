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
    oppdaterArbeidslisteSuccess,
    RedigerArbeidslisteAction,
    slettArbeidslisteActionError,
    slettArbeidslisteActionSuccess
} from './actions';
import ArbeidslisteApi from '../../api/arbeidsliste-api';
import { FETCH_STATUS } from '../../types/fetch-status';
import { TildelVeilederActionType } from '../tildel-veileder/actions';
import OppfolgingSelector from '../oppfolging/selector';

export type ArbeidslisteState = { data: Arbeidsliste } & { status: FETCH_STATUS; error: OrNothing<Error> };

const initialState: ArbeidslisteState = {
    data: {
        arbeidslisteAktiv: null,
        endringstidspunkt: null,
        frist: null,
        harVeilederTilgang: false,
        isOppfolgendeVeileder: false,
        kommentar: null,
        overskrift: null,
        sistEndretAv: null,
        veilederId: null,
        kategori: null
    },
    status: 'NOT_STARTED',
    error: null
};

const arbeidslisteReducer: Reducer<ArbeidslisteState, ArbeidslisteActions> = (state = initialState, action) => {
    switch (action.type) {
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE:
        case ArbeidslisteActionType.LAGRE_ARBEIDSLISTE:
        case ArbeidslisteActionType.REDIGER_ARBEIDSLISTE: {
            return {
                ...state,
                status: 'LOADING'
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS:
        case ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_SUCESS:
        case ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE'
            };
        }
        case ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.SLETT_ARBEIDSLISTE_ERROR:
        case ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error
            };
        }
        case ArbeidslisteActionType.SLETT_ARBEIDSLISTE: {
            return {
                ...state,
                data: {
                    harVeilederTilgang: state.data.harVeilederTilgang,
                    isOppfolgendeVeileder: state.data.isOppfolgendeVeileder,
                    kommentar: null,
                    overskrift: null,
                    sistEndretAv: null,
                    veilederId: null,
                    arbeidslisteAktiv: null,
                    endringstidspunkt: null,
                    frist: null,
                    kategori: null
                },
                status: 'DONE'
            };
        }
        default:
            return state;
    }
};

function* hentArbeidsliste(action: HentArbeidslisteAction) {
    try {
        const fodselsnummer = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => ArbeidslisteApi.fetchArbeidslisteData(action.fnr || fodselsnummer));
        yield put(hentArbeidslisteSuccess(response));
    } catch (e) {
        yield put(hentArbeidslisteError(e));
    }
}

function* lagreArbeidsliste(action: OppdaterArbeidslisteAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const arbeidslisteForm = Object.assign({ fnr }, action.arbeidsliste);
        const response = yield call(() => ArbeidslisteApi.lagreArbeidsliste(fnr, arbeidslisteForm));
        yield put(oppdaterArbeidslisteSuccess(response));
    } catch (e) {
        yield put(oppdaterArbeidslisteError(e));
    }
}

function* redigerArbeidsliste(action: RedigerArbeidslisteAction) {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => ArbeidslisteApi.redigerArbeidsliste(fnr, action.arbeidsliste));
        yield put(oppdaterArbeidslisteSuccess(response));
    } catch (e) {
        yield put(oppdaterArbeidslisteError(e));
    }
}

function* slettArbeidsliste() {
    try {
        const fnr = yield select(OppfolgingSelector.selectFnr);
        const response = yield call(() => ArbeidslisteApi.slettArbeidsliste(fnr));
        yield put(slettArbeidslisteActionSuccess(response));
    } catch (e) {
        yield put(slettArbeidslisteActionError(e));
    }
}

export function* arbeidslisteSaga() {
    yield takeLatest(ArbeidslisteActionType.HENT_ARBEIDSLISTE, hentArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.LAGRE_ARBEIDSLISTE, lagreArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.SLETT_ARBEIDSLISTE, slettArbeidsliste);
    yield takeLatest(ArbeidslisteActionType.REDIGER_ARBEIDSLISTE, redigerArbeidsliste);
    yield takeLatest(TildelVeilederActionType.TILDEL_VEILEDER_SUCCESS, hentArbeidsliste);
}

export default arbeidslisteReducer;
