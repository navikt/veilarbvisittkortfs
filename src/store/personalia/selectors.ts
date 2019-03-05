import { Appstate } from '../../types/appstate';
import { Personalia } from '../../types/personalia';
import { PersonaliaState } from './reducer';

export interface PersonaliaSelector {
    selectPersonaliaData: (state: Appstate) => Personalia;
    selectFodselsnummer: (state: Appstate) => string;
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
    const personaliaStatus = selectPersonaliaSlice(state).status;
    return  personaliaStatus === 'NOT_STARTED' || personaliaStatus === 'LOADING';
}

function selectSammensattNavn (state: Appstate): string {
    return selectPersonaliaData(state).sammensattNavn;
}

export default {
    selectPersonaliaData,
    selectFodselsnummer,
    selectPersonaliaIsLoading,
    selectSammensattNavn
} as PersonaliaSelector;