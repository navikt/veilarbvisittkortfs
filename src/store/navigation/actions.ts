import { StringOrNothing } from '../../types/utils/stringornothings';

export type NavigerActionType =
    'NAVIGER' |
    'START_ESKALERING_SUCCESS' |
    'SETT_MANUELL_SUCCESS' |
    'SETT_DIGITAL_SUCCESS' |
    'STOPP_KVP_SUCCESS' |
    'START_KVP_SUCCESS' |
    'LAGRE_OPPGAVE_SUCCESS';

export interface NavigerAction {
    type: NavigerActionType;
    location: StringOrNothing;
    payload?: any;
}
export const navigerAction = (location: StringOrNothing): NavigerAction => ({
    type: 'NAVIGER',
    location
});

export const navigerActionMedPayload = (type: NavigerActionType ,location: StringOrNothing, payload?: any): NavigerAction => ({
    type: 'NAVIGER',
    location,
    payload
});