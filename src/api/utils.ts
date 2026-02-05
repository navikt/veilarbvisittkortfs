import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { APP_NAME, isDefined } from '../util/utils';
import { TildelVeilederData } from './veilarboppfolging';
import { StansVarselQueryRequest } from './veilarbdialogGraphql';
import { VeilederDataListeRequest } from './veilarbveileder';

export const axiosInstance = axios.create({
    withCredentials: true,
    headers: { 'Nav-Consumer-Id': APP_NAME }
});

export const axiosJsonRequestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: { 'Nav-Consumer-Id': APP_NAME, 'Content-Type': 'application/json' }
};

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

export type RequestTypes =
    | FnrOgEnhetId
    | Fnr
    | TildelVeilederData[]
    | StansVarselQueryRequest
    | VeilederDataListeRequest;

export const createPOSToptions = (event: RequestTypes) => ({
    withCredentials: true,
    method: 'POST',
    body: JSON.stringify(event),
    headers: {
        'Content-Type': 'application/json',
        'Nav-Consumer-Id': APP_NAME
    }
});

const GETOptions = {
    method: 'GET',
    headers: {
        'Nav-Consumer-Id': APP_NAME,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    }
};

export const fetchWithPost = async (url: string, requestBody: RequestTypes) => {
    const respons = await fetch(url, createPOSToptions(requestBody));
    return handleResponse(respons);
};

export const get = async (url: string) => {
    const respons = await fetch(url, GETOptions);
    return handleResponse(respons);
};

const handleResponse = async (respons: Response) => {
    if (respons.status >= 400) {
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

    try {
        return await respons.text().then(res => (!res ? null : JSON.parse(res)));
    } catch (err) {
        return {
            error: err,
            status: null,
            info: null
        };
    }
};

export const swrOptions = {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 5,
    errorRetryInterval: 15000
};
