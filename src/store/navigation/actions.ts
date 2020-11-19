import { StringOrNothing } from '../../util/type/stringornothings';

export type NavigerActionType =
    | 'NAVIGER_TIL_PROSSER'
    | 'NAVIGER'
    | 'START_ESKALERING_SUCCESS'
    | 'SETT_MANUELL_SUCCESS'
    | 'SETT_DIGITAL_SUCCESS'
    | 'STOPP_KVP_SUCCESS'
    | 'LAGRE_OPPGAVE_SUCCESS'
    | 'LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE'
    | 'AVSLUTT_OPPFOLGING_SUCCESS'
    | 'STOPP_ESKALERING_SUCCESS'
    | 'OPPRETTET_HENVENDELSE_START_ESKALERING'
    | 'NAVIGER_TIL_AVSLUTT_OPPFOLGING'
    | 'LAGRE_OPPGAVE'
    | 'LAGRE_ARBEIDSLISTE'
    | 'REDIGER_ARBEIDSLISTE'
    | 'SLETT_ARBEIDSLISTE'
    | 'AVSLUTT_OPPFOLGING';

export interface NavigerAction {
    type: NavigerActionType;
    location?: StringOrNothing;
    begrunnelse?: string;
}

export const navigerTilAvsluttOppfolging = (): NavigerAction => ({
    type: 'NAVIGER_TIL_AVSLUTT_OPPFOLGING',
});

export const navigerTilProcesser = (): NavigerAction => ({
    type: 'NAVIGER_TIL_PROSSER',
});

export const navigerAction = (location: StringOrNothing): NavigerAction => ({
    type: 'NAVIGER',
    location,
});

export const navigerActionMedPayload = (
    type: NavigerActionType,
    location: StringOrNothing,
    begrunnelse?: string
): NavigerAction => ({
    type,
    location,
    begrunnelse,
});
