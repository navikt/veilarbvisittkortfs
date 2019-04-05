import { Arbeidsliste, ArbeidslisteformData } from '../../types/arbeidsliste';

export enum ArbeidslisteActionType {
    HENT_ARBEIDSLISTE = 'HENT_ARBEIDSLISTE',
    HENT_ARBEIDSLISTE_SUCCESS = 'HENT_ARBEIDSLISTE_SUCCESS',
    HENT_ARBEIDSLISTE_ERROR = 'HENT_ARBEIDSLISTE_ERROR',
    SLETT_ARBEIDSLISTE = 'SLETT_ARBEIDSLISTE',
    SLETT_ARBEIDSLISTE_SUCCESS = 'SLETT_ARBEIDSLISTE_SUCCESS',
    SLETT_ARBEIDSLISTE_ERROR = 'SLETT_ARBEIDSLISTE_ERROR',
    LAGRE_ARBEIDSLISTE = 'LAGRE_ARBEIDSLISTE',
    LAGRE_ARBEIDSLISTE_SUCESS = 'LAGRE_ARBEIDSLISTE_SUCCESS',
    LAGRE_ARBEIDSLISTE_ERROR = 'LAGRE_ARBEIDSLISTE_ERROR',
    REDIGER_ARBEIDSLISTE = 'REDIGER_ARBEIDSLISTE',
    REDIGER_ARBEIDSLISTE_SUCCESS = 'REDIGER_ARBEIDSLISTE_SUCCESS',
    REDIGER_ARBEIDSLISTE_ERROR = 'REDIGER_ARBEIDSLISTE_ERROR',

}

export const slettArbeidsliste = (): SlettArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE,
    };
};

export const slettArbeidslisteActionSuccess = (data: Arbeidsliste): SlettArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE_SUCCESS,
        data
    };
};

export const slettArbeidslisteActionError = (error: Error): SlettArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE_ERROR,
        error
    };
};

export const oppdaterArbeidsliste = (arbeidsliste: ArbeidslisteformData): OppdaterArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE,
        arbeidsliste,
    };
};

export const oppdaterArbeidslisteSuccess = (data: Arbeidsliste): OppdaterArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_SUCESS,
        data,
    };
};

export const oppdaterArbeidslisteError = (error: Error): OppdaterArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_ERROR,
        error
    };
};

export const redigerArbeidsliste = (arbeidsliste: ArbeidslisteformData): RedigerArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE,
        arbeidsliste,
    };
};

export const redigerArbeidslisteSuccess = (data: Arbeidsliste): RedigerArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_SUCCESS,
        data,
    };
};

export const redigerArbeidslisteError = (error: Error): RedigerArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_ERROR,
        error
    };
};

export const hentArbeidsliste = (fnr: string): HentArbeidslisteAction => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE,
        fnr
    };
};

export const hentArbeidslisteSuccess = (data: Arbeidsliste): HentArbeidslisteActionSuccess => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS,
        data
    };
};

export const hentArbeidslisteError = (error: Error): HentArbeidslisteActionError => {
    return {
        type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR,
        error
    };
};

export interface OppdaterArbeidslisteAction {
    type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE;
    arbeidsliste: ArbeidslisteformData;
}

export interface OppdaterArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_SUCESS;
    data: Arbeidsliste;
}

export interface OppdaterArbeidslisteActionError {
    type: ArbeidslisteActionType.LAGRE_ARBEIDSLISTE_ERROR;
    error: Error;
}

export interface RedigerArbeidslisteAction {
    type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE;
    arbeidsliste: ArbeidslisteformData;
}

export interface RedigerArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_SUCCESS;
    data: Arbeidsliste;
}

export interface RedigerArbeidslisteActionError {
    type: ArbeidslisteActionType.REDIGER_ARBEIDSLISTE_ERROR;
    error: Error;
}

export interface HentArbeidslisteAction {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE;
    fnr: string;
}

export interface HentArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_SUCCESS;
    data: Arbeidsliste;
}

export interface HentArbeidslisteActionError {
    type: ArbeidslisteActionType.HENT_ARBEIDSLISTE_ERROR;
    error: Error;
}

export interface SlettArbeidslisteAction {
    type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE;
}

export interface SlettArbeidslisteActionSuccess {
    type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE_SUCCESS;
    data: Arbeidsliste;
}

export interface SlettArbeidslisteActionError {
    type: ArbeidslisteActionType.SLETT_ARBEIDSLISTE_ERROR;
    error: Error;
}

export type ArbeidslisteActions =
    HentArbeidslisteAction |
    HentArbeidslisteActionSuccess |
    HentArbeidslisteActionError |
    OppdaterArbeidslisteAction |
    OppdaterArbeidslisteActionSuccess |
    OppdaterArbeidslisteActionError |
    SlettArbeidslisteAction |
    SlettArbeidslisteActionSuccess |
    SlettArbeidslisteActionError |
    RedigerArbeidslisteAction |
    RedigerArbeidslisteActionSuccess |
    RedigerArbeidslisteActionError;