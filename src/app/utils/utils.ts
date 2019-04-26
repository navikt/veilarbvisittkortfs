import queryString from 'query-string';

export function storeForbokstaver(tekster: string[]): string {
    const tekst = tekster.filter(s => s).join(' ');

    return tekst
        .split(' ')
        .map(ord => ord
            .split('-')
            .map(navn => navn.charAt(0).toUpperCase() + navn.slice(1).toLowerCase())
            .join('-')
        )
        .join(' ');
}

export function replaceAt<T>(array: T[], index: number, value: T) {
    const ret = array.slice(0);
    ret[index] = value;
    return ret;
}

export const NAIS_PREPROD_SUFFIX = 'preprod.local/';
export const NAIS_PROD_SUFFIX = 'adeo.no/';

export function finnMiljoStreng() {
    const host = window.location.host;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex, dotIndex);
}

export function finnNaisMiljoStreng() {
    const host = window.location.host;
    const isProd = !host.includes('-');
    if (isProd) {
        return NAIS_PROD_SUFFIX;
    }
    return NAIS_PREPROD_SUFFIX;
}

export function finnNaisDomene() {
    return `.nais.${finnNaisMiljoStreng()}`;
}

export function erITestMiljo() {
    return window.location.hostname.indexOf('-q') >= 0;
}

export function triggerReRenderingAvAktivitesplan() {
    if (window) {
        window.dispatchEvent(new Event('rerenderAktivitetsplan'));
    }
}

export function hentEnhetsIdFraUrl(): string {
  const enhetId = queryString.parse(location.search).enhet;
  if (Array.isArray(enhetId)) {
        return enhetId[0];
    }
  return enhetId || '';
}