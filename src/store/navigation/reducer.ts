import { Reducer } from 'redux';
import { NavigerAction } from './actions';
import { StringOrNothing } from '../../types/utils/stringornothings';

export interface NavigationState {
    location: StringOrNothing;
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
        default :
            return state;
    }
};

export default navigationReducer;