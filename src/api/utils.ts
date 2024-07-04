import axios, { AxiosError } from 'axios';
import { APP_NAME, isDefined } from '../util/utils';

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: { 'Nav-Consumer-Id': APP_NAME }
});

export function isAnyLoading(...fetchers: Array<{ loading: boolean }>): boolean {
    return fetchers.some(f => f.loading);
}

export function isAnyLoadingOrNotStarted(
    ...fetchers: Array<{ data?: object; error?: object; loading: boolean }>
): boolean {
    return fetchers.some(f => f.loading || (!f.error && !f.data));
}

export function hasAnyFailed(...fetchers: Array<{ error?: AxiosError }>): boolean {
    return fetchers.some(f => f.error);
}

export function hasAllData(...fetchers: Array<{ data?: object }>): boolean {
    return fetchers.every(f => isDefined(f.data));
}

export interface FnrOgEnhetId {
    fnr: string;
    enhetId: string;
}

export interface Fnr {
    fnr: string;
}

export interface ErrorMessage {
    error: Error;
    status: number;
}

export type RequestTypes = FnrOgEnhetId | Fnr;

export const createPOSToptions = (event: RequestTypes) => ({
    withCredentials: true,
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Content-Type': 'application/json',
        'Nav-Consumer-Id': APP_NAME
    }
});

export const fetchWithPost = async (url: string, requestBody: RequestTypes) => {
    const respons = await fetch(url, createPOSToptions(requestBody));
    if (respons.status >= 500) {
        throw {
            error: new Error('Det har skjedd en feil ved henting av data.'),
            status: respons.status
        } as ErrorMessage;
    }
    if (respons.status === 204) {
        return {
            error: null,
            status: respons.status
        };
    }

    return respons.text().then(res => (!res ? null : JSON.parse(res)));
};

export const swrOptions = {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
};
