import { useMemo } from 'react';
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import useAxiosHook, { configure, Options, RefetchOptions, ResponseValues } from 'axios-hooks';
import { APP_NAME } from '../util/utils';

export type UseAxiosResponseValue<T> = ResponseValues<T> & {
    fetch: (config?: AxiosRequestConfig, options?: RefetchOptions) => AxiosPromise<T>;
};

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: { 'Nav-Consumer-Id': APP_NAME },
});

configure({ axios: axiosInstance });

export function useAxios<T = any>(config: AxiosRequestConfig | string, options?: Options): UseAxiosResponseValue<T> {
    const [{ data, loading, error }, refetch] = useAxiosHook<T>(config, options);
    return useMemo(() => ({ data, loading, error, fetch: refetch }), [data, loading, error, refetch]);
}

export function isAnyLoading(...axiosResponseValues: Array<{ loading: boolean }>): boolean {
    return axiosResponseValues.some((responseValue) => responseValue.loading);
}

export function hasAnyFailed(...axiosResponseValues: Array<{ error?: AxiosError }>): boolean {
    return axiosResponseValues.some((responseValue) => responseValue.error);
}
