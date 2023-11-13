import { axiosInstance } from './utils';
import { AxiosPromise } from 'axios';

export function fetchHarUtkast(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.post<boolean>(`/veilarbvedtaksstotte/api/v2/hent-harUtkast`, { fnr: fnr });
}

export function fetchErUtrullet(enhet: string): AxiosPromise<boolean> {
    return axiosInstance.get<boolean>(`/veilarbvedtaksstotte/api/utrulling/erUtrullet?enhet=${enhet}`);
}
