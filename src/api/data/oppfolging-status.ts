import { StringOrNothing } from '../../util/type/stringornothings';
import { OrNothing } from '../../util/type/ornothing';

export type Formidlingsgruppe = 'ARBS' | 'IARBS' | 'ISERV' | 'PARBS' | 'RARBS';
export type Servicegruppe = 'BKART' | 'IVURD' | 'OPPFI' | 'VARIG' | 'VURDI' | 'VURDU';

interface OppfolgingEnhet {
    navn: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface OppfolgingStatus {
    oppfolgingsenhet: OppfolgingEnhet;
    veilederId: StringOrNothing;
    formidlingsgruppe: OrNothing<Formidlingsgruppe>;
    servicegruppe: OrNothing<Servicegruppe>;
}
