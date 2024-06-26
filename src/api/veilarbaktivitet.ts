import { axiosInstance } from './utils';
import { AxiosPromise } from 'axios';

export function fetchHarArenaTiltak(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.get<boolean>(`/veilarbaktivitet/api/arena/harTiltak?fnr=${fnr}`);
}
