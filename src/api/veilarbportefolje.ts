import useSWR from 'swr';
import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { OrNothing, StringOrNothing } from '../util/type/utility-types';

export interface Huskelapp {
    huskelappId: StringOrNothing;
    frist: OrNothing<Date>;
    kommentar: StringOrNothing;
    endretDato: OrNothing<Date>;
    endretAv: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface HuskelappformValues {
    huskelappId: StringOrNothing;
    kommentar: StringOrNothing;
    frist: StringOrNothing;
}

export interface HuskelappLagreValues {
    brukerFnr: StringOrNothing;
    kommentar: StringOrNothing;
    frist: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface HuskelappRedigerValues {
    huskelappId: StringOrNothing;
    brukerFnr: StringOrNothing;
    kommentar: StringOrNothing;
    frist: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface EndreFargekategoriResponse {
    data: string[];
    errors: string[];
    fargekategoriVerdi: string;
}

export interface Fargekategori {
    fargekategoriVerdi: FargekategoriModell;
    enhetId: StringOrNothing;
}

export enum FargekategoriModell {
    FARGEKATEGORI_A = 'FARGEKATEGORI_A',
    FARGEKATEGORI_B = 'FARGEKATEGORI_B',
    FARGEKATEGORI_C = 'FARGEKATEGORI_C',
    FARGEKATEGORI_D = 'FARGEKATEGORI_D',
    FARGEKATEGORI_F = 'FARGEKATEGORI_F',
    FARGEKATEGORI_E = 'FARGEKATEGORI_E',
    INGEN_KATEGORI = 'INGEN_KATEGORI'
}

export enum Fargekategorinavn {
    FARGEKATEGORI_A = 'Blå halvsirkel',
    FARGEKATEGORI_B = 'Grønn trekant',
    FARGEKATEGORI_C = 'Gul sirkel',
    FARGEKATEGORI_D = 'Lilla firkant',
    FARGEKATEGORI_E = 'Turkis femkant',
    FARGEKATEGORI_F = 'Oransje rombe',
    INGEN_KATEGORI = 'Ingen kategori'
}

export function lagreHuskelapp(huskelappformValues: HuskelappLagreValues): AxiosPromise<string> {
    return axiosInstance.post(`/veilarbportefolje/api/v1/huskelapp`, huskelappformValues);
}

export function redigerHuskelapp(huskelappformValues: HuskelappRedigerValues): AxiosPromise {
    return axiosInstance.put(`/veilarbportefolje/api/v1/huskelapp`, huskelappformValues);
}

export function slettHuskelapp(huskelappId: string): AxiosPromise<string> {
    return axiosInstance.delete(`/veilarbportefolje/api/v1/huskelapp`, { data: { huskelappId: huskelappId } });
}

export function endreFargekategori(fargekategoriVerdi: string, fnr: string): AxiosPromise<EndreFargekategoriResponse> {
    return axiosInstance.put('/veilarbportefolje/api/v1/fargekategorier', { fargekategoriVerdi, fnr: [fnr] });
}

export function useErUfordeltBruker(fnr: string, skalHenteData: boolean = true) {
    const url = '/veilarbportefolje/api/v1/hent-er-bruker-ufordelt';
    const { data, error, isLoading, mutate } = useSWR<boolean, ErrorMessage>(
        skalHenteData && fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr ?? null }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}

export function useHuskelapp(fnr: string, skalHenteData: boolean = true) {
    const url = '/veilarbportefolje/api/v1/hent-huskelapp-for-bruker';
    const { data, error, isLoading, mutate } = useSWR<Huskelapp, ErrorMessage>(
        skalHenteData && fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}

export function useFargekategori(fnr: string, skalHenteData: boolean = true) {
    const url = '/veilarbportefolje/api/v1/hent-fargekategori';
    const { data, error, isLoading, mutate } = useSWR<Fargekategori, ErrorMessage>(
        skalHenteData && fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}
