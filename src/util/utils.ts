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

export function replaceAt<T>(array: T[], index: number, value: T) {
	const ret = array.slice(0);
	ret[index] = value;
	return ret;
}

export function isEmpty(array: undefined | any[]): boolean {
	return !array || array.length === 0;
}

export function doAll(...fns: (() => void)[]) {
	fns.forEach(fn => fn());
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

export function eskaleringVarselSendtEvent() {
	window.dispatchEvent(new Event('eskaleringsVarselSendt'));
}
