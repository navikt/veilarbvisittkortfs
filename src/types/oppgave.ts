import { StringOrNothing } from './utils/stringornothings';

export type OppgaveTema =
    'DAGPENGER' |
    'OPPFOLGING' |
    'ARBEIDSAVKLARING' |
    'INDIVIDSTONAD' |
    'ENSLIG_FORSORGER'|
    'TILLEGGSTONAD';

export type OppgaveType = 'VURDER_HENVENDELSE' | 'VURDER_KONSEKVENS_FOR_YTELSE';
export type PrioritetType = 'NORM' | 'LAV' | 'HOY';

export interface OppgaveFormData {
    avsenderenhetId: string;
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: Date;
    tilDato: Date;
    prioritet: PrioritetType;
    tema: OppgaveTema;
    type: OppgaveType;
    veilederId: StringOrNothing;
}

export interface BehandlandeEnhet {
    enhetId: string;
    navn: string;
}