import { StringOrNothing } from '../../../../util/type/utility-types';

export function opprettetAvTekst(
    opprettetAv: string,
    opprettetAvBrukerId: string,
    opprettetAvBrukerNavn?: StringOrNothing
) {
    switch (opprettetAv) {
        case 'NAV': {
            if (opprettetAvBrukerId && opprettetAvBrukerNavn) {
                return `av ${opprettetAvBrukerId} (${opprettetAvBrukerNavn})`;
            }

            if (opprettetAvBrukerId) {
                return `av ${opprettetAvBrukerId}`;
            }

            return '';
        }
        case 'SYSTEM':
            return 'av system (automatisk oppdatering)';
        default:
            return 'av brukeren';
    }
}
