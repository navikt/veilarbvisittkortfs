import moment from "moment";

export const erGyldigISODato = (isoDato: string) => isoDato && moment(isoDato, moment.ISO_8601).isValid();

export const validerArbeidslisteDatoFeldt = (input: string): string| undefined => {
    let error;
    const inputDato = moment(input);
    const fraDato = moment();
    if (input && !erGyldigISODato(input)) {
        error = 'Ugyldig dato';
    } else if (inputDato && (fraDato.isAfter(inputDato, 'day'))) {
        error = 'Fristen må være i dag eller senere'
    }
    return error;
};

export const validerOppgaveDatoFeldt = (input: string): string| undefined => {
    let error;
    if(!input) {
        error= 'Du må angi en dato'
    }
    else if (input && !erGyldigISODato(input)) {
        error = 'Ugyldig dato';
    }
    return error;
};

export const validerOppgaveDatoer = (fra: string, frist: string) => {
    let errors;
    const fraDato = moment(fra);
    const fristDato = moment(frist);
    if (fraDato.isAfter(fristDato, 'day')) {
        errors = {tilDato : 'Fra dato kan ikke være etter frist dato'};
    }
    return errors;
};


export const validerArbeidslisteTittelFeldt = (input: string): string | undefined => {
    let error;
    if (!input) {
        error = 'Du må fylle ut en tittel';
    } else if (input.length > 12) {
        error = 'Du må korte ned teksten til 12 tegn';
    }
    return error;
};

export const validerArbeidslisteKommentarFeldt = (kommentar: string): string | undefined => {
    let error;
    if (!kommentar) {
        error = 'Du må fylle ut en kommentar';
    } else if (kommentar.length > 500) {
        error = 'Du må korte ned teksten til 500 tegn';
    }
    return error;
};

export function validerBeskrivelse (maxTegn: number)  {
    return (beskrivelse: string) => {
        let error;
        if (!beskrivelse) {
            error = 'Du må fylle ut en beskrivelse';
        } else if (beskrivelse.length > maxTegn) {
            error = `Du må korte ned teksten til ${maxTegn} tegn`;
        }
        return error;
    }
}

export const validerBeskrivelse500TegnFeldt = (beskrivelse: string): string | undefined => {
    let error;
    if (!beskrivelse) {
        error = 'Du må fylle ut en beskrivelse';
    } else if (beskrivelse.length > 500) {
        error = 'Du må korte ned teksten til 500 tegn';
    }
    return error;
};