import {Oppfolgingsstatus} from "../../types/oppfolgingsstatus";

export interface HentOppfolgingsstatusAction {
    type: OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS;
    fnr: string;
}

export interface HentOppfolgingsstatusActionLoading {
    type: OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS_LOADING;
}


export interface HentOppfolgingsstatusActionSuccess {
    type: 'HENT_OPPFOLGINGSSTATUS_OK';
    data: Oppfolgingsstatus;
}

export const hentOppfolgingsstatus = (fnr: string): HentOppfolgingsstatusAction => {
    return {
        type: OppfolgingsstatusTypes.HENT_OPPFOLGINGSSTATUS,
        fnr,
    };
};

export enum OppfolgingsstatusTypes {
    HENT_OPPFOLGINGSSTATUS_OK = 'HENT_OPPFOLGINGSSTATUS_OK',
    HENT_OPPFOLGINGSSTATUS = 'HENT_OPPFOLGINGSSTATUS',
    HENT_OPPFOLGINGSSTATUS_LOADING = 'HENT_OPPFOLGINGSSTATUS_LOADING'
}

export type OppfolgingsstatusActions = HentOppfolgingsstatusAction | HentOppfolgingsstatusActionLoading | HentOppfolgingsstatusActionSuccess;