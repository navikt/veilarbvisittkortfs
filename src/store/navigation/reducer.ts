import { Reducer } from 'redux';
import { NavigerAction } from './actions';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface NavigationState {
    location: StringOrNothing;
    payload?: any;
}
const navigationReducer: Reducer<NavigationState, NavigerAction> = (state = {location: null}, action) => {
    switch (action.type) {
        case 'NAVIGER':
            return {
                location : action.location
            };
        case 'START_ESKALERING_SUCCESS':
            return {
                location : 'eskalering_kvittering'
            };
        case 'SETT_MANUELL_SUCCESS':
            return {
                location: 'sett_manuell_kvittering'
            };
        case 'SETT_DIGITAL_SUCCESS' :
            return{
                location: 'start_digital_oppfoling_kvitterig',
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
        default :
            return state;
    }
};

export default navigationReducer;