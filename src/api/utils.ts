import { APP_NAME } from '../util/utils';
import { ForlengOppfolgingRequest, TildelVeilederData, VeilarbOppfolgingGraphqlRequest } from './veilarboppfolging';
import { StansVarselQueryRequest } from './veilarbdialogGraphql';
import { VeilederDataListeRequest } from './veilarbveileder';
import { PersonaliaGraphqlRequest } from './veilarbperson';

export interface HttpRequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | null | undefined>;
    data?: unknown;
    withCredentials?: boolean;
    signal?: AbortSignal;
}

export interface HttpResponse<T = unknown> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    config: HttpRequestConfig;
}

export type HttpPromise<T = unknown> = Promise<HttpResponse<T>>;

export class HttpError<T = unknown> extends Error {
    name = 'HttpError';
    response?: HttpResponse<T>;
    config: HttpRequestConfig;

    constructor(message: string, config: HttpRequestConfig, response?: HttpResponse<T>) {
        super(message);
        this.config = config;
        this.response = response;
    }
}

const defaultHeaders = {
    'Nav-Consumer-Id': APP_NAME
};

const defaultJsonHeaders = {
    ...defaultHeaders,
    'Content-Type': 'application/json'
};

const buildUrlWithParams = (url: string, params?: HttpRequestConfig['params']) => {
    if (!params) return url;
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            queryParams.set(key, String(value));
        }
    });
    const queryString = queryParams.toString();
    return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
};

const responseHeadersToObject = (headers: Headers) => {
    const parsedHeaders: Record<string, string> = {};
    headers.forEach((value, key) => {
        parsedHeaders[key] = value;
    });
    return parsedHeaders;
};

const parseResponseData = async <T>(response: Response): Promise<T> => {
    if (response.status === 204) {
        return null as T;
    }

    const text = await response.text();
    if (!text) {
        return null as T;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
        return JSON.parse(text) as T;
    }

    return text as T;
};

const createHttpError = <T>(response: Response, config: HttpRequestConfig, responseData: T): HttpError<T> => {
    const error = new HttpError<T>(`Request failed with status code ${response.status}`, config, {
        data: responseData,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeadersToObject(response.headers),
        config
    });
    return error;
};

const hasContentTypeHeader = (headers: Record<string, string>) =>
    Object.keys(headers).some(headerName => headerName.toLowerCase() === 'content-type');

const httpRequest = async <T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    url: string,
    config: HttpRequestConfig = {}
): Promise<HttpResponse<T>> => {
    const requestUrl = buildUrlWithParams(url, config.params);
    const headers: Record<string, string> = {
        ...defaultHeaders,
        ...(config.headers || {})
    };
    const hasBodyMethod = method !== 'GET';
    const bodyData = config.data;
    const shouldStringifyBody =
        hasBodyMethod && bodyData !== undefined && bodyData !== null && typeof bodyData !== 'string';
    const finalHeaders =
        shouldStringifyBody && !hasContentTypeHeader(headers)
            ? {
                  ...headers,
                  'Content-Type': 'application/json'
              }
            : headers;

    const response = await fetch(requestUrl, {
        method,
        credentials: config.withCredentials === false ? 'same-origin' : 'include',
        headers: finalHeaders,
        body: hasBodyMethod
            ? shouldStringifyBody
                ? JSON.stringify(bodyData)
                : (bodyData as BodyInit | null | undefined)
            : undefined,
        signal: config.signal
    }).catch(error => {
        const message = error instanceof Error ? error.message : 'Network Error';
        throw new HttpError(message, config);
    });

    const data = await parseResponseData<T>(response);
    const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: responseHeadersToObject(response.headers),
        config
    };

    if (!response.ok) {
        throw createHttpError(response, config, data);
    }

    return httpResponse;
};

export const httpGet = <T = unknown>(url: string, config: HttpRequestConfig = {}) => httpRequest<T>('GET', url, config);
export const httpPost = <T = unknown>(url: string, data?: unknown, config: HttpRequestConfig = {}) =>
    httpRequest<T>('POST', url, { ...config, data });
export const httpPut = <T = unknown>(url: string, data?: unknown, config: HttpRequestConfig = {}) =>
    httpRequest<T>('PUT', url, { ...config, data });
export const httpPatch = <T = unknown>(url: string, data?: unknown, config: HttpRequestConfig = {}) =>
    httpRequest<T>('PATCH', url, { ...config, data });
export const httpDelete = <T = unknown>(url: string, config: HttpRequestConfig = {}) =>
    httpRequest<T>('DELETE', url, config);

export const http = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    patch: httpPatch,
    delete: httpDelete
};

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
    | VeilarbOppfolgingGraphqlRequest
    | VeilederDataListeRequest
    | PersonaliaGraphqlRequest
    | ForlengOppfolgingRequest;

export const createPOSToptions = (event: RequestTypes) => ({
    withCredentials: true,
    method: 'POST',
    body: JSON.stringify(event),
    headers: defaultJsonHeaders
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
