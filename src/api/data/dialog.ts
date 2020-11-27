import { StringOrNothing } from '../../util/type/stringornothings';

export enum Egenskaper {
    ESKALERINGSVARSEL,
    PARAGRAF8,
}

type Avsender = 'VEILEDER' | 'BRUKER';

interface Henvendelse {
    avsender: Avsender;
    avsenderId: string;
    dialogId: string;
    id: string;
    lest: boolean;
    sendt: string; //TODO DATO
    tekst: string;
}

interface Dialog {
    aktvitetId: StringOrNothing;
    egenskaper: Egenskaper[];
    erLestAvBruker: boolean;
    ferdigBehandlet: boolean;
    henvendelser: Henvendelse[];
    historisk: boolean;
    id: string;
    lest: boolean;
    lestAvBrukerTidspunkt: StringOrNothing;
    opprettetDato: string;
    overskrift: string;
    sisteDato: string;
    sisteTekst: string;
    venterPaSvar: boolean;
}

export interface HenvendelseData {
    begrunnelse: string;
    egenskaper: Egenskaper[];
    overskrift?: string;
    tekst: string;
    dialogId?: string;
}

export default Dialog;
