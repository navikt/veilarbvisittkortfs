import {Appstate} from "../../types/appstate";
import {Personalia} from "../../types/personalia";
import {PersonaliaState} from "./reducer";


export interface PersonaliaSelectors {
    selectPersonaliaData: (state: Appstate) => Personalia;
    selectFodselsnummer: (state: Appstate)=> string,
    selectPersonaliaIsLoading: (state: Appstate) => boolean;
    selectSammensattNavn: (state: Appstate) => string;
}

function selectPersonaliaSlice (state: Appstate): PersonaliaState {
    return state.personalia;
}


function selectPersonaliaData(state: Appstate): Personalia {
    return state.personalia.data;
}

function selectFodselsnummer(state: Appstate): string {
    return selectPersonaliaData(state).fodselsnummer;
}

function selectPersonaliaIsLoading(state: Appstate): boolean {
    return selectPersonaliaSlice(state).isLoading;
}

function selectSammensattNavn (state: Appstate): string {
    return selectPersonaliaData(state).sammensattNavn;
}

export default {
    selectPersonaliaData,
    selectFodselsnummer,
    selectPersonaliaIsLoading,
    selectSammensattNavn
} as PersonaliaSelectors;