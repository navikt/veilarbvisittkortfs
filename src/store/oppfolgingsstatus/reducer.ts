import {Oppfolgingsstatus} from "../../types/oppfolgingsstatus";
import { OppfolgingsstatusActions, OppfolgingsstatusTypes} from "./actions";

type OppfolgingsstatusState = Oppfolgingsstatus & {isLoading: boolean}


const initialState: OppfolgingsstatusState = {
    oppfolgingsenhet: {
        navn: 'NAV TestHeim',
        enhetId: '007'},
    veilederId: null,
    formidlingsgruppe: null,
    servicegruppe: null,
    isLoading: false,
};



const oppfolgingsstatusReducer: <OppfolgingsstatusState, OppfolgingsstatusActions> = (state = initialState, action: OppfolgingsstatusActions) => {
    switch (action.type) {
        case OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS: {
            return {
                ...state,
            };
        }
        case OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS_LOADING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS_OK: {
            return {
                ...action.data,
                isLoading: false,
            }
        }
    }
    return state;
};

export default oppfolgingsstatusReducer;
