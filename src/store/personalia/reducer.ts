import { Reducer } from 'redux';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Personalia } from '../../types/personalia';
import {
    HentHarbruktNivaa4Action,
    hentHarBruktNivaa4Error,
    hentHarBruktNivaa4Success,
    HentPersonaliaAction,
    hentPersonaliaError,
    hentPersonaliaSuccess,
    HarBruktNivaa4ActionType,
    PersonaliaActions,
    PersonaliaActionType,
} from './actions';
import { fetchInnloggetNiva4Data, fetchPersonaliaData } from '../../api/api';
import { FETCH_STATUS } from '../../types/fetch-status';
import { HarBruktNivaa4Type } from '../../types/har-brukt-nivaa4';

export type PersonaliaState = {
    data: Personalia;
    harbruktnivaa4: { data: HarBruktNivaa4Type; error: OrNothing<Error> };
} & { status: FETCH_STATUS; error: OrNothing<Error> };

const initialState: PersonaliaState = {
    status: 'NOT_STARTED',
    error: null,
    data: {
        fornavn: '',
        etternavn: '',
        mellomnavn: null,
        sammensattNavn: '',
        fodselsnummer: '',
        fodselsdato: '',
        kjonn: 'K',
        dodsdato: null,
        diskresjonskode: null,
        egenAnsatt: false,
        sikkerhetstiltak: null,
    },
    harbruktnivaa4: {
        error: null,
        data: {
            harbruktnivaa4: false,
        },
    },
};

const personaliaReducer: Reducer<PersonaliaState, PersonaliaActions> = (state = initialState, action) => {
    switch (action.type) {
        case PersonaliaActionType.HENT_PERSONALIA: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case PersonaliaActionType.HENT_PERSONALIA_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE',
            };
        }
        case PersonaliaActionType.HENT_PERSONALIA_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                error: action.error,
            };
        }
        case HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4: {
            return {
                ...state,
                status: 'LOADING',
            };
        }
        case HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_SUCCESS: {
            return {
                ...state,
                status: 'DONE',
                harbruktnivaa4: {
                    data: action.data,
                    error: null,
                },
            };
        }
        case HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_ERROR: {
            return {
                ...state,
                status: 'ERROR',
                harbruktnivaa4: {
                    ...state.harbruktnivaa4,
                    error: action.error,
                },
            };
        }
        default:
            return state;
    }
};

function* hentPersonalia(action: HentPersonaliaAction) {
    try {
        const response = yield call(() => fetchPersonaliaData(action.fnr));
        yield put(hentPersonaliaSuccess(response));
    } catch (e) {
        yield put(hentPersonaliaError(e));
    }
}

function* hentInnloggetNivaa4(action: HentHarbruktNivaa4Action) {
    try {
        const response = yield call(() => fetchInnloggetNiva4Data(action.fnr));
        yield put(hentHarBruktNivaa4Success(response));
    } catch (e) {
        yield put(hentHarBruktNivaa4Error(e));
    }
}

export function* personaliaSaga() {
    yield takeLatest(PersonaliaActionType.HENT_PERSONALIA, hentPersonalia);
    yield takeLatest(HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4, hentInnloggetNivaa4);
}

export default personaliaReducer;
