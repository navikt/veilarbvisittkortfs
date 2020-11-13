import { StringOrNothing } from '../../util/type/stringornothings';
import { TildelVeilederData } from '../../api/data/tildel-veileder';
import { VeilederData, VeilederListe } from '../../api/data/veilederdata';

export enum TildelVeilederActionType {
    HENT_VEILEDER_PA_ENHETEN = 'HENT_VEILEDER_PA_ENHETEN',
    HENT_VEILEDER_PA_ENHETEN_SUCCESS = 'HENT_VEILEDER_PA_ENHETEN_SUCCESS',
    HENT_VEILEDER_PA_ENHETEN_ERROR = 'HENT_VEILEDER_PA_ENHETEN_ERROR',
    HENT_PALOGGET_VEILEDER = 'HENT_PALOGGET_VEILEDER',
    HENT_PALOGGET_VEILEDER_SUCCESS = 'HENT_PALOGGET_VEILEDER_SUCCESS',
    HENT_PALOGGET_VEILEDER_ERROR = 'HENT_PALOGGET_VEILEDER_ERROR',
    TILDEL_VEILEDER = 'TILDEL_VEILEDER',
    TILDEL_VEILEDER_SUCCESS = 'TILDEL_VEILEDER_SUCCESS',
    TILDEL_VEILEDER_ERROR = 'TILDEL_VEILEDER_ERROR',
}

export interface TildelVeilederAction {
    type: TildelVeilederActionType.TILDEL_VEILEDER;
    data: TildelVeilederData[];
}

export interface TildelVeilederActionSuccess {
    type: TildelVeilederActionType.TILDEL_VEILEDER_SUCCESS;
    data: {
        resultat: string;
        feilendeTilordninger: TildelVeilederData[];
        tilVeilederId: StringOrNothing;
    };
}

export interface TildelVeilederActionError {
    type: TildelVeilederActionType.TILDEL_VEILEDER_ERROR;
    error: Error;
}

export interface HentVeilederPaEnhetenAction {
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN;
    enhetId: string;
}

interface HentVeilederPaEnhetenActionSuccess {
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_SUCCESS;
    data: VeilederListe;
}

interface HentVeilederPaEnhetenActionError {
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_ERROR;
    error: Error;
}

export interface HentPaloggetVeilederAction {
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER;
}

interface HentPaloggetVeilederActionSuccess {
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER_SUCCESS;
    data: VeilederData;
}

interface HentPaloggetVeilederActionError {
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER_ERROR;
    error: Error;
}

export const tildelTilVeileder = (data: TildelVeilederData[]): TildelVeilederAction => ({
    type: TildelVeilederActionType.TILDEL_VEILEDER,
    data,
});

export const tildelVeilederSuccess = (data: {
    resultat: string;
    feilendeTilordninger: TildelVeilederData[];
    tilVeilederId: StringOrNothing;
}): TildelVeilederActionSuccess => ({
    type: TildelVeilederActionType.TILDEL_VEILEDER_SUCCESS,
    data,
});

export const tildelVeilederError = (error: Error): TildelVeilederActionError => ({
    type: TildelVeilederActionType.TILDEL_VEILEDER_ERROR,
    error,
});

export const hentPaloggetVeileder = (): HentPaloggetVeilederAction => ({
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER,
});

export const hentPaloggetVeilederSuccess = (data: VeilederData): HentPaloggetVeilederActionSuccess => ({
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER_SUCCESS,
    data,
});

export const hentPaloggetVeilederError = (error: Error): HentPaloggetVeilederActionError => ({
    type: TildelVeilederActionType.HENT_PALOGGET_VEILEDER_ERROR,
    error,
});

export const hentAlleVeiledereForEnhetenSuccess = (data: VeilederListe): HentVeilederPaEnhetenActionSuccess => ({
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_SUCCESS,
    data,
});

export const hentAlleVeiledereForEnhetenError = (error: Error): HentVeilederPaEnhetenActionError => ({
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN_ERROR,
    error,
});

export const hentAlleVeiledereForEnheten = (enhetId: string): HentVeilederPaEnhetenAction => ({
    type: TildelVeilederActionType.HENT_VEILEDER_PA_ENHETEN,
    enhetId,
});

export type TildelVeilederActions =
    | HentVeilederPaEnhetenAction
    | HentVeilederPaEnhetenActionSuccess
    | HentVeilederPaEnhetenActionError
    | HentPaloggetVeilederAction
    | HentPaloggetVeilederActionSuccess
    | HentPaloggetVeilederActionError
    | TildelVeilederAction
    | TildelVeilederActionSuccess
    | TildelVeilederActionError;
