export const APP_NAME = 'veilarbvisittkortfs';

export function isLocalDevelopment(): boolean {
    return import.meta.env.MODE === 'mock';
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
