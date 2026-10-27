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
        case 'AVSLUTTET_AAP_SAK':
            return 'AAP-sak avsluttet';
        case 'FOLKEREGISTERSTATUS_FORSVUNNET':
            return 'Folkeregisterstatus: Forsvunnet';
        case 'FOLKEREGISTERSTATUS_OPPHORT':
            return 'Folkeregisterstatus: Opphørt';
        case 'FOLKEREGISTERSTATUS_UKJENT':
            return 'Folkeregisterstatus: Ukjent';
        case 'FOLKEREGISTERSTATUS_INGEN_STATUS':
            return 'Folkeregisterstatus: Ingen status';
        case undefined:
        case null:
            return null;
    }
}
