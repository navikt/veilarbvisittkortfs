import { StringOrNothing } from './type/utility-types';

const emdashCharacterCode = 8212;
const EMDASH = String.fromCharCode(emdashCharacterCode);

export function formaterTelefonnummer(telefon: StringOrNothing): string {
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
    } else if (landkode.length) {
        // Dette vil ikkje skje med mindre telefonnummer er norsk eller vi endrar attkjenning av landkodar. Eg let koden liggje fordi den illustrerar korleis vi skulle ynskje det var. 2024-12-17, Ingrid.
        return `${landkode} ${splittTall.join(' ')}`;
    } else {
        return `${splittTall.join(' ')}`;
    }
}
