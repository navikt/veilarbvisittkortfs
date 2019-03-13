import { fetchToJson, postAsJson } from './api-utils';
import { VeilederData } from '../types/veilederdata';
import { TildelVeilederData } from '../types/tildel-veileder';

interface TildelVeilederApi {
    hentVeiledereForEnhet: (enhetId: string) => Promise<VeilederData[]>;
    hentVeieldere: () => Promise<VeilederData>;
    tildelTilVeileder: (tilordninger: TildelVeilederData[]) => Promise<{resultat: string, feilendeTilordninger: TildelVeilederData[]}>;
}

function hentVeiledereForEnhet(enhetId: string) {
    return fetchToJson(`/veilarbveileder/api/enhet/${enhetId}/veiledere`);
}

function hentVeieldere() {
    return fetchToJson('/veilarbveileder/api/veileder/me');
}

function tildelTilVeileder(tilordninger: TildelVeilederData[]) {
    return postAsJson(`/veilarboppfolging/api/tilordneveileder/`, tilordninger);
}

export default {
    hentVeiledereForEnhet,
    hentVeieldere,
    tildelTilVeileder,
} as TildelVeilederApi;