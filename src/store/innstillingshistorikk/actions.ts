import {InnstillingsHistorikk} from "../../types/innstillings-historikk";

export enum InnstillingshistorikActionType {
    HENT_INNSTILLINGSHISTORIKK = 'HENT_INNSTILLINGSHISTORIKK',
    HENT_INNSTILLINGSHISTORIKK_ERROR =  'HENT_INNSTILLINGSHISTORIKK_ERROR',
    HENT_INNSTILLINGSHISTORIKK_SUCCESS = 'HENT_INNSTILLINGSHISTORIKK_SUCCES'
}

export interface HentInnstillinghistorikAction {
    type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK;
    fnr: string;
}

interface HentInnstillingshistorikkActionSuccess {
    type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_SUCCESS;
    data: InnstillingsHistorikk[];
}

interface InstillinghistorikActionError {
    type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_ERROR;
    error: Error;
}

export const hentInstillingshistorikk = (fnr: string): HentInnstillinghistorikAction => ({
        type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK,
        fnr
});

export const hentInstillingshistorikkSuccess = (data: InnstillingsHistorikk[]): HentInnstillingshistorikkActionSuccess => ({
    type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_SUCCESS,
    data,
});

export const hentInstillingshistorikkError = (error: Error): InstillinghistorikActionError  => ({
    type: InnstillingshistorikActionType.HENT_INNSTILLINGSHISTORIKK_ERROR,
    error
});


export type InnstillingshistorikActions = HentInnstillinghistorikAction | HentInnstillingshistorikkActionSuccess | InstillinghistorikActionError;