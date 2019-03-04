import { fetchToJson, postAsJson } from './api-utils';
import { VeilederData } from '../types/veilederdata';
import { TildelVeilederData } from '../types/tildel-veileder';

interface TildelVeilederApi {
    hentVeieldereForEnhet: (enhetId: string) => Promise<VeilederData[]>;
    hentVeieldere: () => Promise<VeilederData>;
    tildelTilVeileder: (tilordninger: TildelVeilederData[]) => Promise<{resultat: string, feilendeTilordninger: TildelVeilederData[]}>;
}

function hentVeieldereForEnhet(enhetId: string) {
    return fetchToJson(`/veilarbveileder/api/enhet/${enhetId}/veiledere`);
}

function hentVeieldere() {
    return fetchToJson('/veilarbveileder/api/veileder/me');
}

function tildelTilVeileder(tilordninger: TildelVeilederData[]) {
    return postAsJson(`/veilarboppfolging/api/tilordneveileder`, tilordninger)
}

export default {
    hentVeieldereForEnhet,
    hentVeieldere,
    tildelTilVeileder,
} as TildelVeilederApi;