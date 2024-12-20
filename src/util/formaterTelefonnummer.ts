import { StringOrNothing } from './type/utility-types';

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export function formaterTelefonnummer(uformatertTelefonnummer: StringOrNothing): string {
    if (!uformatertTelefonnummer) {
        return EMDASH;
    }

    // Fjernar eventuelle mellomrom frå telefonnummer
    let telefonnummer = uformatertTelefonnummer.replace(/\s/g, '');

    // Tek bort landkode frå norske telefonnummer
    if (telefonnummer.startsWith('0047')) {
        telefonnummer = telefonnummer.slice(4);
    } else if (telefonnummer.startsWith('+47')) {
        telefonnummer = telefonnummer.slice(3);
    }

    return lagStrengMedToOgToTegnGruppert(telefonnummer);
}

const lagStrengMedToOgToTegnGruppert = (telefonnummer: string): string => {
    const ettOgEttSifferListe: string[] = telefonnummer.split('');
    const toOgToSifferListe: string[] = [];

    while (ettOgEttSifferListe.length) {
        toOgToSifferListe.push(ettOgEttSifferListe.splice(0, 2).join(''));
    }

    return toOgToSifferListe.join(' ');
};
