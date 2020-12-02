import { Options } from 'axios-hooks';
import { useAxios, UseAxiosResponseValue } from './utils';

export function useFetchHarTiltak(fnr: string, options?: Options): UseAxiosResponseValue<boolean> {
    return useAxios<boolean>(`/veilarbaktivitet/api/aktivitet/harTiltak?fnr=${fnr}`, options);
}
