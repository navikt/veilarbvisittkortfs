import { OppfolgingStatus } from '../../types/oppfolging-status';

export enum OppfolgingstatusActionType {
    HENT_OPPFOLGINGSTATUS = 'HENT_OPPFOLGINGSTATUS',
    HENT_OPPFOLGINGSTATUS_SUCCESS = 'HENT_OPPFOLGINGSTATUS_SUCCESS',
    HENT_OPPFOLGINGSTATUS_ERROR = 'HENT_OPPFOLGINGSTATUS_ERROR'
}

export const hentOppfolgingsstatus = (fnr: string): HentOppfolgingstatusAction => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS,
        fnr
    };
};

export const hentOppfolgingstatusSuccess = (data: OppfolgingStatus): HentOppfolgingstatusActionSuccess => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS,
        data
    };
};

export const hentOppfolgingstatusError = (error: Error): HentOppfolgingstatusActionError => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR,
        error
    };
};

export interface HentOppfolgingstatusAction {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS;
    fnr: string;
}

export interface HentOppfolgingstatusActionSuccess {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS;
    data: OppfolgingStatus;
}

export interface HentOppfolgingstatusActionError {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR;
    error: Error;
}

export type OppfolgingStatusActions = HentOppfolgingstatusAction | HentOppfolgingstatusActionSuccess | HentOppfolgingstatusActionError;