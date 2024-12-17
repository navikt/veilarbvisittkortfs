import { AxiosResponse } from 'axios';
import { StringOrNothing } from './type/utility-types';

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export const APP_NAME = 'veilarbvisittkortfs';

export function isLocalDevelopment(): boolean {
    return import.meta.env.MODE === 'mock';
}

export const erProd = () => import.meta.env.PROD;

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

export function isEmpty<Type>(array: undefined | Type[]): boolean {
    return !array || array.length === 0;
}

export function erITestMiljo() {
    return window.location.hostname.indexOf('-q') >= 0 || window.location.hostname.indexOf('dev') >= 0;
}

export function eskaleringVarselSendtEvent() {
    window.dispatchEvent(new Event('eskaleringsVarselSendt'));
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
export function filterUnique<Type>(array: Type[]): Type[] {
    return Array.from(new Set(array));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isDefined(subject: any): boolean {
    return subject !== undefined && subject !== null;
}

export function formaterTelefonnummer(telefon: StringOrNothing) {
    let norskTelefonnummer = false;

    if (!telefon) {
        return EMDASH;
    }

    // Fjernar mellomrom frå telefonnummer
    let telefonNr = telefon.replace(/\s/g, '');

    // Sjekk om det er eit norsk telefonnummer
    let landkode = '';
    if (telefonNr.startsWith('0047')) {
        landkode = '+47';
        telefonNr = telefonNr.slice(4);
        norskTelefonnummer = true;
    } else if (telefonNr.startsWith('+47')) {
        landkode = telefonNr.slice(0, 3);
        telefonNr = telefonNr.slice(3);
        norskTelefonnummer = true;
    }

    const tall = telefonNr.split('');
    const splittTall = [];

    while (tall.length) {
        splittTall.push(tall.splice(0, 2).join(''));
    }

    if (norskTelefonnummer) {
        return splittTall.join(' ');
    } else return `${landkode} ${splittTall.join(' ')}`;
}
