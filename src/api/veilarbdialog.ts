import { AxiosPromise, AxiosResponse } from 'axios';
import { axiosInstance, fetchWithPost, swrOptions } from './utils';
import { StringOrNothing } from '../util/type/utility-types';
import {
    dialogerQuery,
    DialogerResponse,
    stansVarselHistorikkQuery,
    StansVarselHistorikkResponse,
    stansVarselQuery,
    StansVarselResponse,
    veilarbdialogGraphqlQuery
} from './veilarbdialogGraphql';
import useSWR from 'swr';

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
    begrunnelseType: string;
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

export const useGjeldendeEskaleringsvarsel = (fnr: string | undefined) => {
    const url = veilarbDialogGraphqlEndpoint;
    const { data, error, isLoading, mutate } = useSWR<GjeldendeEskaleringsvarsel | undefined>(
        fnr ? `${url}-${fnr}` : null,
        () =>
            fetchWithPost(url, veilarbdialogGraphqlQuery(fnr as string, stansVarselQuery)).then(
                (res: StansVarselResponse) => res.data.stansVarsel
            ),
        swrOptions
    );
    return { gjeldendeEskaleringsvarsel: data, error, isLoading, mutate: mutate };
};

export const useEskaleringsvarselHistorikk = (fnr: string | undefined) => {
    const url = veilarbDialogGraphqlEndpoint;
    const { data, isLoading, error } = useSWR(
        fnr ? `${url}/${fnr}` : undefined,
        () =>
            fetchWithPost(
                veilarbDialogGraphqlEndpoint,
                veilarbdialogGraphqlQuery(fnr as string, stansVarselHistorikkQuery)
            ),
        swrOptions
    );
    return {
        eskaleringsvarselHistorikkData: data,
        eskaleringsvarselHistorikkLoading: isLoading,
        eskaleringsvarselHistorikkError: error
    };
};

export function hentEskaleringsvarselHistorikk(fnr: string): AxiosPromise<EskaleringsvarselHistorikkInnslag[]> {
    return axiosInstance
        .post(veilarbDialogGraphqlEndpoint, veilarbdialogGraphqlQuery(fnr, stansVarselHistorikkQuery))
        .then((res: AxiosResponse<StansVarselHistorikkResponse>) => ({
            ...res,
            data: res.data.data.stansVarselHistorikk
        }));
}

export function startEskalering(startEskaleringRequest: StartEskaleringRequest): AxiosPromise {
    return axiosInstance.post('/veilarbdialog/api/eskaleringsvarsel/start', startEskaleringRequest);
}

export function stopEskalering(stopEskaleringRequest: StopEskaleringRequest): AxiosPromise {
    return axiosInstance.patch('/veilarbdialog/api/eskaleringsvarsel/stop', stopEskaleringRequest);
}
