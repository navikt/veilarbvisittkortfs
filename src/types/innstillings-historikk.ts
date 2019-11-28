import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';

export type InnstillingsHistorikkType =
    | 'SATT_TIL_DIGITAL'
    | 'SATT_TIL_MANUELL'
    | 'AVSLUTTET_OPPFOLGINGSPERIODE'
    | 'ESKALERING_STARTET'
    | 'ESKALERING_STOPPET'
    | 'KVP_STARTET'
    | 'KVP_STOPPET'
    | 'VEILEDER_TILORDNET'
    | 'OPPFOLGINGSENHET_ENDRET';

export type InnstillingsHistorikkOpprettetAvType = 'NAV' | 'SYSTEM' | 'EKSTERN';

export interface InnstillingsHistorikk {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: StringOrNothing;
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: StringOrNothing;
    dialogId: OrNothing<number>;
    veileder?: string;
    enhet?: StringOrNothing;
}
