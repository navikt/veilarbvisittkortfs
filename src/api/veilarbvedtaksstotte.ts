import { axiosInstance, ErrorMessage, get, swrOptions } from './utils';
import { AxiosPromise } from 'axios';
import useSWR from 'swr';

export function fetchHarUtkast(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.post<boolean>(`/veilarbvedtaksstotte/api/v2/hent-harUtkast`, { fnr: fnr });
}

export function useErUtrullet(enhet?: string) {
    const url = `/veilarbvedtaksstotte/api/utrulling/erUtrullet?enhetId=${enhet}`;
    return useSWR<boolean, ErrorMessage>(enhet ? url : null, () => get(url), swrOptions);
}
