import { Reducer } from 'redux';
import { OrNothing } from '../../types/utils/ornothing';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Personalia } from '../../types/personalia';
import {
    HentPersonaliaAction,
    hentPersonaliaError,
    hentPersonaliaSuccess,
    PersonaliaActions,
    PersonaliaActionType
} from './actions';
import { fetchPersonaliaData } from '../../api/api';
import {FETCH_STATUS} from "../../types/fetch-status";

export type PersonaliaState = {data: Personalia} & {status: FETCH_STATUS; error: OrNothing<Error>};

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
    }
};

const personaliaReducer: Reducer<PersonaliaState, PersonaliaActions> = (state = initialState, action) => {
    switch (action.type) {
        case PersonaliaActionType.HENT_PERSONALIA: {
            return {
                ...state,
                status: 'LOADING'
            };
        }
        case PersonaliaActionType.HENT_PERSONALIA_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE'
            };
        }
        case PersonaliaActionType.HENT_PERSONALIA_ERROR: {
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

function* hentPersonalia(action: HentPersonaliaAction) {
    try {
        const response = yield call( () => fetchPersonaliaData(action.fnr));
        yield put(hentPersonaliaSuccess(response));
    } catch (e) {
        yield put(hentPersonaliaError(e));
    }
}

export function* personaliaSaga() {
    yield takeLatest(PersonaliaActionType.HENT_PERSONALIA, hentPersonalia);
}

export default personaliaReducer;