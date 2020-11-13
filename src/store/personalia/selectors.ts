import { Appstate } from '../../types/appstate';
import { Personalia } from '../../types/personalia';
import { PersonaliaState } from './reducer';
import { storeForbokstaver } from '../../component/utils/utils';
import { StringOrNothing } from '../../util/type/stringornothings';

export interface PersonaliaSelector {
    selectPersonaliaData: (state: Appstate) => Personalia;
    selectFodselsnummer: (state: Appstate) => string;
    selectPersonaliaIsLoading: (state: Appstate) => boolean;
    selectSammensattNavn: (state: Appstate) => string;
    selectFornavn: (state: Appstate) => string;
    selectEtternavn: (state: Appstate) => string;
    selectMellomnavn: (state: Appstate) => string;
    selectHarBruktNivaa4: (state: Appstate) => boolean;
}

function selectPersonaliaSlice(state: Appstate): PersonaliaState {
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
    return personaliaStatus === 'NOT_STARTED' || personaliaStatus === 'LOADING';
}

function selectSammensattNavn(state: Appstate): string {
    const fornavn = selectFornavn(state);
    const mellomnavn = selectMellomnavn(state) || '';
    const etternavn = selectEtternavn(state);
    return storeForbokstaver([fornavn, mellomnavn, etternavn]);
}

function selectFornavn(state: Appstate): string {
    return selectPersonaliaData(state).fornavn;
}

function selectEtternavn(state: Appstate): string {
    return selectPersonaliaData(state).etternavn;
}

function selectMellomnavn(state: Appstate): StringOrNothing {
    return selectPersonaliaData(state).mellomnavn;
}

function selectHarBruktNivaa4(state: Appstate): boolean {
    return state.personalia.harbruktnivaa4.data.harbruktnivaa4;
}

export default {
    selectPersonaliaData,
    selectFodselsnummer,
    selectPersonaliaIsLoading,
    selectSammensattNavn,
    selectEtternavn,
    selectFornavn,
    selectMellomnavn,
    selectHarBruktNivaa4,
} as PersonaliaSelector;
