import axios, { AxiosError } from 'axios';
import { APP_NAME, isDefined } from '../util/utils';

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: { 'Nav-Consumer-Id': APP_NAME }
});

export function isAnyLoading(...fetchers: Array<{ loading: boolean }>): boolean {
    return fetchers.some(f => f.loading);
}

export function isAnyLoadingOrNotStarted(...fetchers: Array<{ data?: any; error?: any; loading: boolean }>): boolean {
    return fetchers.some(f => f.loading || (!f.error && !isDefined(f.data)));
}

export function hasAnyFailed(...fetchers: Array<{ error?: AxiosError }>): boolean {
    return fetchers.some(f => f.error);
}

export function hasAllData(...fetchers: Array<{ data?: any }>): boolean {
    return fetchers.every(f => isDefined(f.data));
}
