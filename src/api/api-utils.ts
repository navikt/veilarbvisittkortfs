/* tslint:disable */
const defaultHeaders = {
    'Content-Type': 'application/json',
    NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION')
};

export function sjekkStatuskode(response: Response) {
    if (response.status >= 200 && response.status < 300 && response.ok && !response.redirected) {
        return response;
    }
    throw new Error(response.statusText || response.type);
}

export function toJson(response: Response) {
    if (response.status !== 204) {
        // No content
        return response.json();
    }
    return response;
}

function getCookie(name: string) {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
}

function methodToJson<T>(method: string, url: string, data: T, config: any) {
    return fetchToJson(url, {
        ...{
            method,
            credentials: 'same-origin',
            headers: defaultHeaders,
            body: JSON.stringify(data)
        },
        ...config
    });
}

export function fetchToJson<T = any>(url: string, config = { headers: defaultHeaders }): Promise<T> {
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(toJson);
}

export function postAsJson(url: string, data = {}, config = {}) {
    return methodToJson('post', url, data, config);
}

export function putAsJson(url: string, data = {}, config = {}) {
    return methodToJson('put', url, data, config);
}

export function deleteAsJson(url: string, data = {}, config = {}) {
    return methodToJson('delete', url, data, config);
}
