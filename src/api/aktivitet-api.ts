import { fetchToJson } from './api-utils';

export interface AktivitetApi {
    hentHarTiltak: (fnr: string) => Promise<boolean>;
}

function hentHarTiltak(fnr: string) {
    return fetchToJson(`/veilarbaktivitet/api/aktivitet/harTiltak?fnr=${fnr}`);
}

export default { hentHarTiltak } as AktivitetApi;
