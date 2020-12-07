import { axiosInstance } from './utils';
import { AxiosPromise } from 'axios';

export function fetchHarUtkast(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.get<boolean>(`/veilarbvedtaksstotte/api/${fnr}/harUtkast`);
}
