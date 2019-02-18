import {Personalia} from "../../types/personalia";


export enum PersonaliaActionType {
    HENT_PERSONALIA = 'HENT_PERSONALIA',
    HENT_PERSONALIA_SUCCESS = 'HENT_PERSONALIA_SUCCESS',
    HENT_PERSONALIA_ERROR = 'HENT_OPPFOLGINGSTATUS_ERROR',
}


export const hentPersonalia = (fnr: string): HentPersonaliaAction => ({
    type: PersonaliaActionType.HENT_PERSONALIA,
    fnr

});

export const hentPersonaliaSuccess = (data: Personalia): HentPersonaliaActionSuccess => ({
    type:  PersonaliaActionType.HENT_PERSONALIA_SUCCESS,
    data
});

export const hentPersonaliaError = (error: Error): HentPersonaliaActionError => ({
    type:  PersonaliaActionType.HENT_PERSONALIA_ERROR,
    error

});


export interface HentPersonaliaAction {
    type: PersonaliaActionType.HENT_PERSONALIA;
    fnr:string;
}

export interface HentPersonaliaActionSuccess {
    type: PersonaliaActionType.HENT_PERSONALIA_SUCCESS;
    data: Personalia;
}

export interface HentPersonaliaActionError {
    type: PersonaliaActionType.HENT_PERSONALIA_ERROR;
    error: Error;
}

export type PersonaliaActions = HentPersonaliaAction | HentPersonaliaActionSuccess | HentPersonaliaActionError;