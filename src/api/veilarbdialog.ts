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

export const useDialoger = (fnr: string | undefined) => {
    const { data, isLoading } = useSWR<DialogerResponse>(
        fnr ? `${veilarbDialogGraphqlEndpoint}/dialoger/${fnr}` : null,
        () => fetchWithPost(veilarbDialogGraphqlEndpoint, veilarbdialogGraphqlQuery(fnr as string, dialogerQuery)),
        swrOptions
    );
    return {
        dialogerData: data?.data?.dialoger,
        dialogerLoading: isLoading
    };
};

export const useGjeldendeEskaleringsvarsel = (fnr: string | undefined) => {
    const url = veilarbDialogGraphqlEndpoint;
    const { data, error, isLoading, mutate } = useSWR<GjeldendeEskaleringsvarsel | undefined>(
        fnr ? `${url}/gjeldendeEskalering/${fnr}` : null,
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
    const { data, isLoading, error } = useSWR<StansVarselHistorikkResponse>(
        fnr ? `${url}/eskaleringHistorikk/${fnr}` : undefined,
        () =>
            fetchWithPost(
                veilarbDialogGraphqlEndpoint,
                veilarbdialogGraphqlQuery(fnr as string, stansVarselHistorikkQuery)
            ),
        swrOptions
    );
    return {
        eskaleringsvarselHistorikkData: data?.data?.stansVarselHistorikk,
        eskaleringsvarselHistorikkLoading: isLoading,
        eskaleringsvarselHistorikkError: error
    };
};

export function startEskalering(startEskaleringRequest: StartEskaleringRequest): AxiosPromise {
    return axiosInstance.post('/veilarbdialog/api/eskaleringsvarsel/start', startEskaleringRequest);
}

export function stopEskalering(stopEskaleringRequest: StopEskaleringRequest): AxiosPromise {
    return axiosInstance.patch('/veilarbdialog/api/eskaleringsvarsel/stop', stopEskaleringRequest);
}
