import { Reducer } from 'redux';
import { OppfolgingActions
} from './actions';
import { Oppfolging } from '../../types/oppfolging';
import { OrNothing } from '../../types/utils/ornothing';
import { OppfolgingActionType } from './action-type';
import { FETCH_STATUS } from '../../types/fetch-status';

export type OppfogingState = {data: Oppfolging} & {status: FETCH_STATUS; error: OrNothing<Error>};

const initialState: OppfogingState = {
    status: 'NOT_STARTED',
    error: null,
    data: {
        avslutningStatus: null,
        erIkkeArbeidssokerUtenOppfolging: false,
        erSykmeldtMedArbeidsgiver: false,
        fnr: '',
        gjeldeneEskaleringsvarsel: null,
        harSkriveTilgang: false,
        inaktivtIArena: false,
        inaktiveringsdato: null,
        kanReaktiveras: false,
        kanStarteOppfolging: false,
        manuell: false,
        oppfolgingUtgang: null,
        oppfolgingsPerioder: [],
        reservarsjonKRR: false,
        underKvp: false,
        underOppfolging: false,
        veilederId: null,
        vilkarMaBesvarel: false,
    }
};

const oppfolgingReducer: Reducer<OppfogingState, OppfolgingActions> = (state = initialState, action) => {
    switch (action.type) {
        case OppfolgingActionType.HENT_OPPFOLGING:
        case OppfolgingActionType.START_ESKALERING:
        case OppfolgingActionType.SETT_MANUELL:
        case OppfolgingActionType.SETT_DIGITAL:
        case OppfolgingActionType.START_KVP:
        case OppfolgingActionType.STOPP_KVP:
        case OppfolgingActionType.AVSLUTT_OPPFOLGING:
        case OppfolgingActionType.STOPP_ESKALERING: {
            return {
                ...state,
                status: 'LOADING'
            };
        }
        case OppfolgingActionType.HENT_OPPFOLGING_SUCCESS:
        case OppfolgingActionType.START_ESKALERING_SUCCESS:
        case OppfolgingActionType.SETT_MANUELL_SUCCESS:
        case OppfolgingActionType.SETT_DIGITAL_SUCCESS:
        case OppfolgingActionType.AVSLUTT_OPPFOLGING_SUCCESS:
        case OppfolgingActionType.STOPP_ESKALERING_SUCCESS: {
            return {
                ...state,
                data: action.data,
                status: 'DONE'
            };
        }
        case OppfolgingActionType.HENT_OPPFOLGING_ERROR:
        case OppfolgingActionType.START_ESKALERING_ERROR:
        case OppfolgingActionType.SETT_MANUELL_ERROR:
        case OppfolgingActionType.SETT_DIGITAL_ERROR:
        case OppfolgingActionType.START_KVP_ERROR:
        case OppfolgingActionType.AVSLUTT_OPPFOLGING_ERROR:
        case OppfolgingActionType.STOPP_KVP_ERROR:
        case OppfolgingActionType.STOPP_ESKALERING_ERROR: {
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

export default oppfolgingReducer;