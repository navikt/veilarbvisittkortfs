import { Appstate } from '../../types/appstate';

export interface TilgangTilKontorSelector {
    selectHarTilgangTilKontoret: (state: Appstate) => boolean;
}

function selectHarTilgangTilKontoret(state: Appstate): boolean {
    return state.tilgangTilBrukersKontor.data.tilgangTilBrukersKontor;
}

export default {
    selectHarTilgangTilKontoret
}as TilgangTilKontorSelector;