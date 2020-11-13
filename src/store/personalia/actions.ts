import { Personalia } from '../../api/data/personalia';
import { HarBruktNivaa4Type } from '../../api/data/har-brukt-nivaa4';

export enum PersonaliaActionType {
    HENT_PERSONALIA = 'HENT_PERSONALIA',
    HENT_PERSONALIA_SUCCESS = 'HENT_PERSONALIA_SUCCESS',
    HENT_PERSONALIA_ERROR = 'HENT_OPPFOLGINGSTATUS_ERROR',
}

export enum HarBruktNivaa4ActionType {
    HENT_INNLOGGETNIVAA4 = 'HENT_INNLOGGETNIVAA4',
    HENT_INNLOGGETNIVAA4_SUCCESS = 'HENT_INNLOGGETNIVAA4_SUCCESS',
    HENT_INNLOGGETNIVAA4_ERROR = 'HENT_INNLOGGETNIVAA4_ERROR',
}

export const hentPersonalia = (fnr: string): HentPersonaliaAction => ({
    type: PersonaliaActionType.HENT_PERSONALIA,
    fnr,
});

export const hentPersonaliaSuccess = (data: Personalia): HentPersonaliaActionSuccess => ({
    type: PersonaliaActionType.HENT_PERSONALIA_SUCCESS,
    data,
});

export const hentPersonaliaError = (error: Error): HentPersonaliaActionError => ({
    type: PersonaliaActionType.HENT_PERSONALIA_ERROR,
    error,
});

export interface HentPersonaliaAction {
    type: PersonaliaActionType.HENT_PERSONALIA;
    fnr: string;
}

export interface HentPersonaliaActionSuccess {
    type: PersonaliaActionType.HENT_PERSONALIA_SUCCESS;
    data: Personalia;
}

export interface HentPersonaliaActionError {
    type: PersonaliaActionType.HENT_PERSONALIA_ERROR;
    error: Error;
}

export interface HentHarBruktNivaa4ActionSuccess {
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_SUCCESS;
    data: HarBruktNivaa4Type;
}

export interface HentHarBruktNivaa4ActionError {
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_ERROR;
    error: Error;
}

export interface HentHarbruktNivaa4Action {
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4;
    fnr: string;
}

export const hentHarBruktNivaa4 = (fnr: string): HentHarbruktNivaa4Action => ({
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4,
    fnr,
});

export const hentHarBruktNivaa4Success = (data: HarBruktNivaa4Type): HentHarBruktNivaa4ActionSuccess => ({
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_SUCCESS,
    data,
});

export const hentHarBruktNivaa4Error = (error: Error): HentHarBruktNivaa4ActionError => ({
    type: HarBruktNivaa4ActionType.HENT_INNLOGGETNIVAA4_ERROR,
    error,
});

export type PersonaliaActions =
    | HentPersonaliaAction
    | HentPersonaliaActionSuccess
    | HentPersonaliaActionError
    | HentHarbruktNivaa4Action
    | HentHarBruktNivaa4ActionSuccess
    | HentHarBruktNivaa4ActionError;
