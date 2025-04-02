import { axiosInstance } from './utils';
import { AxiosPromise } from 'axios';

export function fetchHarUtkast(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.post<boolean>(`/veilarbvedtaksstotte/api/v2/hent-harUtkast`, { fnr: fnr });
}
