import {Reducer} from "redux";
import {NavigationActions, NavigationActionTypes} from "./actions";
import {StringOrNothing} from "../../types/utils/stringornothings";

export interface NavigationState {
    location: StringOrNothing;
}
const navigationReducer: Reducer<NavigationState, NavigationActions> = (state = {location: null}, action) => {
    switch(action.type) {
        case NavigationActionTypes.PROSESSER: {
            return {location: "prosesser"}
        }
        case NavigationActionTypes.START_ESKALERING: {
            return {location: "start_eskalering"}
        }
        case NavigationActionTypes.START_ESKALERING_KVITTERING: {
            return {location: "start_esklaering_kvittering"}
        }
        case NavigationActionTypes.TILBAKE: {
            return {location: null}
        }
    }
    return state;

};


export default navigationReducer;