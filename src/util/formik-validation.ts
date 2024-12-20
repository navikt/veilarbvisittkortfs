import dayjs from 'dayjs';
import { erGyldigISODato } from './date-utils';

export const validerFristFelt = (input: string): string | undefined => {
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

export const validerHuskelappKommentarFelt = (kommentar: string): string | undefined => {
    let error;
    if (kommentar.length > 200) {
        error = 'Du må korte ned teksten til 200 tegn';
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
