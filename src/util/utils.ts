import { AxiosResponse } from 'axios';
import { PersonaliaTelefon } from "../api/veilarbperson";
import { StringOrNothing } from "./type/utility-types";

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export default EMDASH;

export function visEmdashHvisNull(verdi: StringOrNothing) {
    return verdi ? verdi : EMDASH;
}
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

export function erITestMiljo() {
    return window.location.hostname.indexOf('-q') >= 0 || window.location.hostname.indexOf('dev') >= 0;
}

export function eskaleringVarselSendtEvent() {
    window.dispatchEvent(new Event('eskaleringsVarselSendt'));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
export function filterUnique(array: any[]): any[] {
    return Array.from(new Set(array));
}

export function isDefined(subject: any): boolean {
    return subject !== undefined && subject !== null;
}

export function formaterTelefonnummer(telefon: PersonaliaTelefon | undefined | string) {
    if (!telefon) {
        return EMDASH;
    }
    let telefonNr = telefon?.toString();
    let landkode = '';

    if (telefonNr?.startsWith('0047')) {
        landkode = '+47';
        telefonNr = telefonNr.slice(4);
    } else if (telefonNr?.startsWith('+47')) {
        landkode = telefonNr.slice(0, 3);
        telefonNr = telefonNr.slice(3);
    }

    const tall = telefonNr?.split('');
    const splittTall = [];

    while (tall?.length) {
        splittTall.push(tall.splice(0, 2).join(''));
    }

    return `${landkode} ${splittTall.join(' ')}`;
}
