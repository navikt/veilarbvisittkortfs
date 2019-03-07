import { StringOrNothing } from './utils/stringornothings';

type InnstillingsHistorikkType =
    'SATT_TIL_DIGITAL' |
    'SATT_TIL_MANUELL' |
    'AVSLUTTET_OPPFOLGINGSPERIODE' |
    'ESKALERING_STARTET' |
    'ESKALERING_STOPPET'|
    'KVP_STARTET'|
    'KVP_STOPPET';

export interface InnstillingsHistorikk {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: string;
    opprettetAv: string;
    opprettetAvBrukerId: string;
    dialogId: StringOrNothing;
}