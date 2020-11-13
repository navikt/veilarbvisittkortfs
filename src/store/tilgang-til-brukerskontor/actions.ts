import { TilgangTilBrukersKontor } from '../../api/data/tilgangtilbrukerskontor';

export enum TilgangTilBrukersKontorActionType {
    HENT_TILGANG_TIL_BRUKERSKONTOR = 'HENT_TILGANG_TIL_BRUKERSKONTOR',
    HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS = 'HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS',
    HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR = 'HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR',
}

export interface TilgangTilBrukersKontorAction {
    type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR;
    fnr: string;
}

interface TilgangTilBrukersKontorActionSuccess {
    type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS;
    data: TilgangTilBrukersKontor;
}

interface TilgangTilBrukersKontorActionError {
    type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR;
    error: Error;
}

export const hentTilgangTilBrukersKontor = (fnr: string): TilgangTilBrukersKontorAction => {
    return {
        type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR,
        fnr,
    };
};

export const hentTilgangTilBrukersKontorSuccess = (
    data: TilgangTilBrukersKontor
): TilgangTilBrukersKontorActionSuccess => ({
    type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_SUCCESS,
    data,
});

export const hentTilgangTilBrukersKontorError = (error: Error): TilgangTilBrukersKontorActionError => ({
    type: TilgangTilBrukersKontorActionType.HENT_TILGANG_TIL_BRUKERSKONTOR_ERROR,
    error,
});

export type TilgangTilBrukersKontorActions =
    | TilgangTilBrukersKontorAction
    | TilgangTilBrukersKontorActionSuccess
    | TilgangTilBrukersKontorActionError;
