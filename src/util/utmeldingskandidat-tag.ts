import { KandidatForUtmeldingTag } from '../api/veilarboppfolging';

export function mapUtmeldingskandidatTag(tag: KandidatForUtmeldingTag | undefined | null): string | null {
    switch (tag) {
        case 'ARBEIDSSOKERPERIODE_AVSLUTTET_IKKE_LEVERT_MELDEKORT':
            return 'Arbeidssøkerperiode avsluttet: Ikke levert bekreftelse';
        case 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE':
            return 'Arbeidssøkerperiode avsluttet: Svarte nei i bekreftelse';
        case 'ARBEIDSSOKERPERIODE_AVSLUTTET_ANNET':
            return 'Arbeidssøkerperiode avsluttet';
        case 'FORLENGELSE_UTLOPT':
            return 'Forlengelse utløpt';

        case undefined:
        case null:
            return null;
    }
}
