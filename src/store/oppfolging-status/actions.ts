import {OppfolgingStatus} from "../../types/oppfolging-status";

export enum OppfolgingstatusActionType {
    HENT_OPPFOLGINGSTATUS = 'HENT_OPPFOLGINGSTATUS',
    HENT_OPPFOLGINGSTATUS_SUCCESS = 'HENT_OPPFOLGINGSTATUS_SUCCESS',
    HENT_OPPFOLGINGSTATUS_ERROR = 'HENT_OPPFOLGINGSTATUS_ERROR',

    START_ESKALERING_OK = 'instillinger/start_eskalering/OK',
    START_ESKALERING_FEILET = 'instillinger/start_eskalering/FEILET',
    START_ESKALERING_PENDING = 'instillinger/start_eskalering/PENDING',

    STOPP_ESKALERING_OK = 'instillinger/stopp_eskalering/OK',
    STOPP_ESKALERING_FEILET = 'instillinger/stopp_eskalering/FEILET',
    STOPP_ESKALERING_PENDING = 'instillinger/stopp_eskalering/PENDING',
}


export const hentOppfolgingsstatus = (fnr: string): HentOppfolgingstatusAction => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS,
        fnr
    }
};

export const hentOppfolgingstatusSuccess = (data: OppfolgingStatus): HentOppfolgingstatusActionSuccess => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS,
        data
    }
};

export const hentOppfolgingstatusError = (error: Error): HentOppfolgingstatusActionError => {
    return {
        type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR,
        error
    }
};


export interface HentOppfolgingstatusAction {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS
    fnr: string
}

export interface HentOppfolgingstatusActionSuccess {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_SUCCESS,
    data: OppfolgingStatus;
}

export interface HentOppfolgingstatusActionError {
    type: OppfolgingstatusActionType.HENT_OPPFOLGINGSTATUS_ERROR,
    error: Error
}

export type OppfolgingStatusActions = HentOppfolgingstatusAction | HentOppfolgingstatusActionSuccess | HentOppfolgingstatusActionError;