import { Reducer } from 'redux';
import { StringOrNothing } from '../../types/utils/stringornothings';


interface EnhetAction {
    type: 'SETT_ENHET_FRA_PERSONFLATEFS',
    enhet: StringOrNothing
}

export interface EnhetState {
    enhet: StringOrNothing;
}


const enhetIdReducer: Reducer<EnhetState, EnhetAction> = (state = {enhet: null}, action) => {
    switch (action.type) {
        case 'SETT_ENHET_FRA_PERSONFLATEFS':
            return {
                enhet: action.enhet
            };
        default :
            return state;
    }
};

export default enhetIdReducer;