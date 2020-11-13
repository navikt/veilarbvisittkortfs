import { fetchToJson, postAsJson } from './api-utils';
import { VeilederData } from './data/veilederdata';
import { TildelVeilederData } from './data/tildel-veileder';

interface VeilederApi {
    hentVeiledereForEnhet: (enhetId: string) => Promise<VeilederData[]>;
    hentVeieldere: () => Promise<VeilederData>;
    tildelTilVeileder: (
        tilordninger: TildelVeilederData[]
    ) => Promise<{ resultat: string; feilendeTilordninger: TildelVeilederData[] }>;
    hentEnhetNavn: (enhetId: string) => string;
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

function hentEnhetNavn(enhetId: string): string {
    return `/veilarbveileder/api/enhet/${enhetId}/navn`;
}

export default {
    hentVeiledereForEnhet,
    hentVeieldere,
    tildelTilVeileder,
    hentEnhetNavn,
} as VeilederApi;
