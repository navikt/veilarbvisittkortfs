import { httpGet, HttpPromise } from './utils';

export function fetchHarArenaTiltak(fnr: string): HttpPromise<boolean> {
    return httpGet<boolean>(`/veilarbaktivitet/api/arena/harTiltak?fnr=${fnr}`);
}
