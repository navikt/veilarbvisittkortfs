import { Reducer } from 'redux';
import { NavigerAction } from './actions';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface NavigationState {
    location: StringOrNothing;
    begrunnelse?: string;
}
const navigationReducer: Reducer<NavigationState, NavigerAction> = (state = {location: null}, action) => {
    switch (action.type) {
        case 'NAVIGER_TIL_PROSSER':
            return {
                location: 'prosesser'
            };
        case 'NAVIGER':
            return {
                location : action.location
            };
        case 'START_ESKALERING_SUCCESS':
            return {
                location : 'eskalering_kvittering'
            };
        case 'STOPP_ESKALERING_SUCCESS': {
            return {
                location: 'stopp_eskalering_kvittering'
            };
        }
        case 'SETT_MANUELL_SUCCESS':
            return {
                location: 'sett_manuell_kvittering',
                begrunnelse: action.begrunnelse
            };
        case 'SETT_DIGITAL_SUCCESS' :
            return{
                location: 'start_digital_oppfoling_kvitterig',
                begrunnelse: action.begrunnelse

            };
        case 'STOPP_KVP_SUCCESS':
            return {
                location: 'stopp_kvp_periode_kvittering',
            };
        case 'START_KVP_SUCCESS':
            return{
                location: 'start_kvp_periode_kvittering',
            };
        case 'LAGRE_OPPGAVE_SUCCESS':
            return {
                location: 'oppgave_kvittering',
            };
        case 'LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE': {
            return {
                location: 'avlutt_oppfolging_bekreft'
            };
        }
        case 'AVSLUTT_OPPFOLGING_SUCCESS': {
            return {
                location: 'avslutt_oppfolging_kvittering'
            };
        }
        default :
            return state;
    }
};

export default navigationReducer;
