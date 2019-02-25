import { StringOrNothing } from '../../types/utils/stringornothings';

export type NavigerActionType = 'NAVIGER' | 'START_ESKALERING_SUCCESS' | 'SETT_MANUELL_SUCCESS';

export interface NavigerAction {
    type: NavigerActionType;
    location: StringOrNothing;
}
export const navigerAction = (location: StringOrNothing): NavigerAction => ({
    type: 'NAVIGER',
    location
});