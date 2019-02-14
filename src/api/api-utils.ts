
const defaultHeaders = new Headers({
    'Content-Type': 'application/json',
    NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
});

export function sjekkStatuskode(response: Response) {
    if (
        response.status >= 200 &&
        response.status < 300 &&
        response.ok &&
        !response.redirected
    ) {
        return response;
    }
    throw new Error(response.statusText || response.type);
}

export function toJson(response:Response) {
    if (response.status !== 204) {
        // No content
        return response.json();
    }
    return response;
}

function getCookie (name: string) {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

function methodToJson<T>(method:string, url:string, data: T, config: any) {
    return fetchToJson(url, {
        ...{
            method,
            credentials: 'same-origin',
            headers: defaultHeaders,
            body: JSON.stringify(data),
        },
        ...config,
    });
}


export function fetchToJson(url:string, config = { headers: defaultHeaders }) {
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(toJson);
}


export function postAsJson(url:string, data = {}, config = {}) {
    return methodToJson('post', url, data, config);
}