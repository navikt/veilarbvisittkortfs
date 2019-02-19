import { Appstate } from '../../types/appstate';
import { Oppfolging } from '../../types/oppfolging';

export function selectOppfolgingData(state: Appstate): Oppfolging {
    return state.oppfolging.data;
}

export function selectFnr(state: Appstate): string {
    return selectOppfolgingData(state).fnr;
}