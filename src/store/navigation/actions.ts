import { StringOrNothing } from '../../types/utils/stringornothings';

export type NavigerActionType =
    'NAVIGER_TIL_PROSSER'|
    'NAVIGER' |
    'START_ESKALERING_SUCCESS' |
    'SETT_MANUELL_SUCCESS' |
    'SETT_DIGITAL_SUCCESS' |
    'STOPP_KVP_SUCCESS' |
    'START_KVP_SUCCESS' |
    'LAGRE_OPPGAVE_SUCCESS' |
    'LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE';

export interface NavigerAction {
    type: NavigerActionType;
    location?: StringOrNothing;
    begrunnelse?: string;
}

export const navigerTilProcesser = (): NavigerAction => ({
    type: 'NAVIGER_TIL_PROSSER',
});

export const navigerAction = (location: StringOrNothing): NavigerAction => ({
    type: 'NAVIGER',
    location
});

export const navigerActionMedPayload = (type: NavigerActionType , location: StringOrNothing, begrunnelse?: string): NavigerAction => ({
    type,
    location,
    begrunnelse
});