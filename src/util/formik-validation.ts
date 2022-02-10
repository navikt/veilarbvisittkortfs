import dayjs from 'dayjs';
import { erGyldigISODato } from './date-utils';

export const validerArbeidslisteDatoFelt = (input: string): string | undefined => {
	let error;
	const inputDato = dayjs(input);
	const fraDato = dayjs();
	if (input && !erGyldigISODato(input)) {
		error = 'Ugyldig dato';
	} else if (inputDato && fraDato.isAfter(inputDato, 'day')) {
		error = 'Fristen må være i dag eller senere';
	}
	return error;
};

export const validerOppgaveDatoFelt = (input: string): string | undefined => {
	let error;
	if (!input) {
		error = 'Du må angi en dato';
	} else if (input && !erGyldigISODato(input)) {
		error = 'Ugyldig dato';
	}
	return error;
};

export const validerArbeidslisteTittelFelt = (input: string): string | undefined => {
	let error;
	if (!input) {
		error = 'Du må fylle ut en tittel';
	} else if (input.length > 30) {
		error = 'Du må korte ned teksten til 30 tegn';
	}
	return error;
};

export const validerArbeidslisteKommentarFelt = (kommentar: string): string | undefined => {
	let error;
	if (!kommentar) {
		error = 'Du må fylle ut en kommentar';
	} else if (kommentar.length > 500) {
		error = 'Du må korte ned teksten til 500 tegn';
	}
	return error;
};

export function validerBeskrivelse(maxTegn: number) {
	return (beskrivelse: string) => {
		let error;
		if (!beskrivelse) {
			error = 'Du må fylle ut en beskrivelse';
		} else if (beskrivelse.length > maxTegn) {
			error = `Du må korte ned teksten til ${maxTegn} tegn`;
		}
		return error;
	};
}

export const validerBeskrivelse500TegnFelt = (beskrivelse: string): string | undefined => {
	let error;
	if (!beskrivelse) {
		error = 'Du må fylle ut en beskrivelse';
	} else if (beskrivelse.length > 500) {
		error = 'Du må korte ned teksten til 500 tegn';
	}
	return error;
};
