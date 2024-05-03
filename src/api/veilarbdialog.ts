import { AxiosPromise, AxiosResponse } from 'axios';
import { axiosInstance } from './utils';
import { StringOrNothing } from '../util/type/utility-types';
import {
    dialogerQuery,
    DialogerResponse,
    stansVarselQuery,
    StansVarselResponse,
    veilarbdialogGraphqlQuery
} from './veilarbdialogGraphql';

export interface Dialog {
    ferdigBehandlet: boolean;
    historisk: boolean;
    id: string;
    venterPaSvar: boolean;
}

export interface StartEskaleringRequest {
    fnr: string;
    begrunnelse: string;
    overskrift: string;
    tekst: string;
}

export interface StopEskaleringRequest {
    fnr: string;
    begrunnelse: string;
    skalSendeHenvendelse: boolean;
}

export interface GjeldendeEskaleringsvarsel {
    id: number;
    tilhorendeDialogId: number;
    opprettetAv: string;
    opprettetDato: string;
    opprettetBegrunnelse: string;
}

export interface EskaleringsvarselHistorikkInnslag {
    id: number;
    tilhorendeDialogId: number;

    opprettetAv: string;
    opprettetAvBrukerNavn?: StringOrNothing;
    opprettetDato: string;
    opprettetBegrunnelse: string;

    avsluttetDato: string | null;
    avsluttetAv: string | null;
    avsluttetAvBrukerNavn?: StringOrNothing;
    avsluttetBegrunnelse: string | null;
}

export const veilarbDialogGraphqlEndpoint = '/veilarbdialog/graphql';

export function fetchDialoger(fnr: string): AxiosPromise<Dialog[]> {
    return axiosInstance
        .post(veilarbDialogGraphqlEndpoint, veilarbdialogGraphqlQuery(fnr, dialogerQuery))
        .then((res: AxiosResponse<DialogerResponse>) => ({
            ...res,
            data: res.data.data.dialoger
        }));
}

export function hentGjeldendeEskaleringsvarsel(fnr: string): AxiosPromise<GjeldendeEskaleringsvarsel> {
    return axiosInstance
        .post(veilarbDialogGraphqlEndpoint, veilarbdialogGraphqlQuery(fnr, stansVarselQuery))
        .then((res: AxiosResponse<StansVarselResponse>) => ({
            ...res,
            data: res.data.data.stansVarsel
        }));
}

export function hentEskaleringsvarselHistorikk(fnr: string): AxiosPromise<EskaleringsvarselHistorikkInnslag[]> {
    return axiosInstance.get(`/veilarbdialog/api/eskaleringsvarsel/historikk?fnr=${fnr}`);
}

export function startEskalering(startEskaleringRequest: StartEskaleringRequest): AxiosPromise {
    return axiosInstance.post('/veilarbdialog/api/eskaleringsvarsel/start', startEskaleringRequest);
}

export function stopEskalering(stopEskaleringRequest: StopEskaleringRequest): AxiosPromise {
    return axiosInstance.patch('/veilarbdialog/api/eskaleringsvarsel/stop', stopEskaleringRequest);
}
