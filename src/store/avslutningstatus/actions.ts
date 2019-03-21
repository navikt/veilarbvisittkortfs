import { AvslutningStatus } from '../../types/oppfolging';

export enum AvsluttOppfolgingType {
    HENT_AVSLUTT_OPPFOLGING_STATUS = 'HENT_AVSLUTT_OPPFOLGING_STATUS',
    HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS = 'HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS',
    HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR = 'HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR',
    HENT_AVSLUTT_OPPFOLGING_RESET = 'NAVIGER_TIL_PROSSER',
    LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE = 'LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE',
}

export interface HentAvsluttOppfolgingStatusAction {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS;
}

export interface HentAvsluttOppfolgingStatusActionReset {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_RESET;
}

export interface HentAvsluttOppfolgingStatusActionSuccess {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS;
    data: AvslutningStatus;
}

export interface HentAvsluttOppfolgingStatusActionError {
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR;
    error: Error;
}

export const hentAvsluttningStatus = (): HentAvsluttOppfolgingStatusAction  => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS
});

export const hentAvsluttningStatusSuccess = (data: AvslutningStatus): HentAvsluttOppfolgingStatusActionSuccess => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_SUCCESS,
    data
});

export const hentAvsluttningStatusError = (error: Error): HentAvsluttOppfolgingStatusActionError => ({
    type: AvsluttOppfolgingType.HENT_AVSLUTT_OPPFOLGING_STATUS_ERROR,
    error
});

export interface LagreBegrunnelse {
    type: AvsluttOppfolgingType.LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE;
    begrunnelse: string;
}

export const lagreBegrunnelse = (begrunnelse: string): LagreBegrunnelse => ({
    type: AvsluttOppfolgingType.LAGRE_AVSLUTT_OPPFOLGING_BEGRUNNELSE,
    begrunnelse
});

export type AvsluttOppfolgingActions =
    HentAvsluttOppfolgingStatusAction |
    HentAvsluttOppfolgingStatusActionSuccess |
    HentAvsluttOppfolgingStatusActionError |
    HentAvsluttOppfolgingStatusActionReset |
    LagreBegrunnelse;