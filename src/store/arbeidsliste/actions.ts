import {Arbeidsliste} from "../../types/arbeidsliste";
import {ArbeidslisteForm} from "../../app/veilederverktoy/arbeidsliste/arbeidsliste-form";

export enum ArbeidslisteActionType {
    HENT_ARBEIDSLISTE = 'HENT_ARBEIDSLISTE',
    HENT_ARBEIDSLISTE_SUCCESS = 'HENT_ARBEIDSLISTE_SUCCESS',
    HENT_ARBEIDSLISTE_ERROR = 'HENT_ARBEIDSLISTE_ERROR',
    SLETT_ARBEIDSLISTE = 'SLETT_ARBEIDSLISTE',
    SLETT_ARBEIDSLISTE_SUCCESS = 'SLETT_ARBEIDSLISTE_SUCCESS',
    SLETT_ARBEIDSLISTE_ERROR = 'SLETT_ARBEIDSLISTE_ERROR',
    OPPDATER_ARBEIDSLISTE = "OPPDATER_TIL_ARBEIDSLISTE",
    OPPDATER_ARBEIDSLISTE_SUCESS = "OPPDATER_TIL_ARBEIDSLISTE_SUCCESS",
    OPPDATER_ARBEIDSLISTE_ERROR = "OPPDATER_TIL_ARBEIDSLISTE_ERROR",

}


export const hentArbeidsliste = (fnr: string): HentArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE,
        fnr
    }
};

export const oppdaterArbeidsliste = (arbeidsliste: ArbeidslisteForm): OppdaterArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE,
        arbeidsliste,
    }
};

export const oppdaterArbeidslisteSuccess = (data: Arbeidsliste): OppdaterArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_SUCESS,
        data,
    }
};

export const oppdaterArbeidslisteError = (error: Error): OppdaterArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_ERROR,
        error
    }
};

export const hentArbeidslisteSuccess = (data: Arbeidsliste): HentArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS,
        data
    }
};

export const hentArbeidslisteError = (error: Error): HentArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR,
        error
    }
};


export interface HentArbeidslisteAction {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE;
    fnr:string;
}

export interface OppdaterArbeidslisteAction {
    type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE;
    arbeidsliste: ArbeidslisteForm;
}

export interface OppdaterArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_SUCESS;
    data: Arbeidsliste;
}

export interface OppdaterArbeidslisteActionError {
    type: ArbeidslisteActionType.OPPDATER_ARBEIDSLISTE_ERROR;
    error: Error;
}

export interface HentArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS;
    data: Arbeidsliste;
}

export interface HentArbeidslisteActionError {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR;
    error: Error
}

export type ArbeidslisteActions =
    HentArbeidslisteAction |
    HentArbeidslisteActionSuccess |
    HentArbeidslisteActionError |
    OppdaterArbeidslisteAction |
    OppdaterArbeidslisteActionSuccess |
    OppdaterArbeidslisteActionError;