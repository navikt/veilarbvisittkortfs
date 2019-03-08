import { StringOrNothing } from './utils/stringornothings';

export type InnstillingsHistorikkType =
    'SATT_TIL_DIGITAL' |
    'SATT_TIL_MANUELL' |
    'AVSLUTTET_OPPFOLGINGSPERIODE' |
    'ESKALERING_STARTET' |
    'ESKALERING_STOPPET'|
    'KVP_STARTET'|
    'KVP_STOPPET';

export type InnstillingsHistorikkOpprettetAvType = 'NAV' | 'SYSTEM' | 'EKSTERN';

export interface InnstillingsHistorikk {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: string;
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: string;
    dialogId: StringOrNothing;
}