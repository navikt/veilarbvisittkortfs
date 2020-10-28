import { AktivitetData } from './reducer';
import { OrNothing } from '../../types/utils/ornothing';
import { Appstate } from '../../types/appstate';

export interface AktivitetSelector {
    selectHarTiltak: (state: Appstate) => boolean;
}

function selectAktivitetData(state: Appstate): OrNothing<AktivitetData> {
    return state.aktvitet?.data;
}

function selectHarTiltak(state: Appstate): boolean {
    return !!selectAktivitetData(state);
}

export default {
    selectAktivitetData,
    selectHarTiltak,
} as AktivitetSelector;
