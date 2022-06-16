import { AxiosResponse } from 'axios';

export const APP_NAME = 'veilarbvisittkortfs';

export function isDevelopment(): boolean {
    return process.env.REACT_APP_DEV === 'true';
}

export function ifResponseHasData<T>(
    callback: (data: T) => void
): (res: AxiosResponse<T>) => Promise<AxiosResponse<T>> {
    return (res: AxiosResponse<T>) => {
        if (res.status < 300 && res.data) {
            callback(res.data);
        }
        return Promise.resolve(res);
    };
}

export function storeForbokstaver(tekster: string[]): string {
    const tekst = tekster.filter(s => s).join(' ');

    return tekst
        .split(' ')
        .map(ord =>
            ord
                .split('-')
                .map(navn => navn.charAt(0).toUpperCase() + navn.slice(1).toLowerCase())
                .join('-')
        )
        .join(' ');
}

export function isEmpty(array: undefined | any[]): boolean {
    return !array || array.length === 0;
}

export function doAll(...fns: (() => void)[]) {
    fns.forEach(fn => fn());
}

export function erGCP(): boolean {
    return window.location.hostname.endsWith('intern.nav.no');
}

export function erITestMiljo() {
    return window.location.hostname.indexOf('-q') >= 0 || window.location.hostname.indexOf('dev') >= 0;
}

export function eskaleringVarselSendtEvent() {
    window.dispatchEvent(new Event('eskaleringsVarselSendt'));
}
