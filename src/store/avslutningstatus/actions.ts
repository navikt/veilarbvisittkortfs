import { AvslutningStatus } from '../../types/oppfolging';

export enum AvsluttOppfolgingType {
    HENT_AVSLUTT_OPPFOLGING_STATUS = 'NAVIGER_TIL_AVSLUTT_OPPFOLGING',
    HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS = 'HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS',
    HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR = 'HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR',
    HENT_AVSLUTT_OPPFOLGING_RESET = 'NAVIGER_TIL_PROSSER',
    LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE = 'LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE',
    RESET_BEGRUNNELSE = 'RESET_BEGRUNNELSE',
    AVSLUTT_OPPFOLGING = 'AVSLUTT_OPPFOLGING',
    AVSLUTT_OPPFOLGING_SUCCESS = 'AVSLUTT_OPPFOLGING_SUCCESS',
    AVSLUTT_OPPFOLGING_ERROR = 'AVSLUTT_OPPFOLGING_ERROR',
}

export interface HentAvsluttOppfolgingStatusAction {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS;
}

export interface HentAvsluttOppfolgingStatusActionReset {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_RESET;
}

export interface ResetBegrunnelse {
    type: AvsluttOppfolgingType.RESET_BEGRUNNELSE;
}

export interface HentAvsluttOppfolgingStatusActionSuccess {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS;
    data: AvslutningStatus;
}

export interface HentAvsluttOppfolgingStatusActionError {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR;
    error: Error;
}

export const hentAvsluttningStatus = (): HentAvsluttOppfolgingStatusAction => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS,
});

export const hentAvsluttningStatusSuccess = (data: AvslutningStatus): HentAvsluttOppfolgingStatusActionSuccess => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS,
    data,
});

export const hentAvsluttningStatusError = (error: Error): HentAvsluttOppfolgingStatusActionError => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR,
    error,
});

export interface LagreBegrunnelse {
    type: AvsluttOppfolgingType.LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE;
    begrunnelse: string;
}

export const lagreBegrunnelse = (begrunnelse: string): LagreBegrunnelse => ({
    type: AvsluttOppfolgingType.LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE,
    begrunnelse,
});

export const resetBegrunnelse = (): ResetBegrunnelse => ({
    type: AvsluttOppfolgingType.RESET_BEGRUNNELSE,
});

export interface AvsluttOppfolgingAction {
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING;
}

export interface AvsluttOppfolgingActionSuccess {
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_SUCCESS;
    data: AvslutningStatus;
}

export interface AvsluttOppfolgingActionError {
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_ERROR;
    error: Error;
}

export const avsluttOppfolging = (): AvsluttOppfolgingAction => ({
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING,
});

export const avsluttOppfolgingSuccess = (data: AvslutningStatus): AvsluttOppfolgingActionSuccess => ({
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_SUCCESS,
    data,
});

export const avsluttOppfolgingError = (error: Error): AvsluttOppfolgingActionError => ({
    type: AvsluttOppfolgingType.AVSLUTT_OPPFOLGING_ERROR,
    error,
});

export type AvsluttOppfolgingActions =
    | HentAvsluttOppfolgingStatusAction
    | HentAvsluttOppfolgingStatusActionSuccess
    | HentAvsluttOppfolgingStatusActionError
    | HentAvsluttOppfolgingStatusActionReset
    | AvsluttOppfolgingAction
    | AvsluttOppfolgingActionSuccess
    | AvsluttOppfolgingActionError
    | ResetBegrunnelse
    | LagreBegrunnelse;
