import useSWR from 'swr';
import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { OrNothing, StringOrNothing } from '../util/type/utility-types';

export interface Arbeidsliste {
    arbeidslisteAktiv: StringOrNothing; //TODO WHAT IS ZIS?
    endringstidspunkt: OrNothing<Date>;
    frist: OrNothing<Date>;
    harVeilederTilgang: boolean;
    isOppfolgendeVeileder: boolean;
    kommentar: StringOrNothing;
    overskrift: StringOrNothing;
    sistEndretAv: OrNothing<{ veilederId: string }>;
    kategori: KategoriModell | null;
    veilederId?: StringOrNothing;
    navkontorForArbeidsliste: StringOrNothing;
}

export interface Huskelapp {
    huskelappId: StringOrNothing;
    frist: OrNothing<Date>;
    kommentar: StringOrNothing;
    endretDato: OrNothing<Date>;
    endretAv: StringOrNothing;
    enhetId: StringOrNothing;
}

export enum KategoriModell {
    BLA = 'BLA',
    GRONN = 'GRONN',
    LILLA = 'LILLA',
    GUL = 'GUL',
    TOM = 'TOM'
}

export interface ArbeidslisteformValues {
    kommentar: StringOrNothing | null;
    frist: StringOrNothing;
    overskrift: StringOrNothing | null;
    kategori: KategoriModell | null;
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

export function lagreArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): AxiosPromise {
    return axiosInstance.post(`/veilarbportefolje/api/v2/arbeidsliste`, { ...{ fnr: fnr }, ...arbeidsliste });
}

export function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): AxiosPromise {
    return axiosInstance.put(`/veilarbportefolje/api/v2/arbeidsliste`, { ...arbeidsliste, fnr });
}

export function slettArbeidsliste(fnr: string): AxiosPromise<Arbeidsliste> {
    return axiosInstance.delete(`/veilarbportefolje/api/v2/arbeidsliste`, { data: { fnr: fnr } });
}

export function slettArbeidslisteMenIkkeFargekategori(fnr: string): AxiosPromise<Arbeidsliste> {
    return axiosInstance.delete(`/veilarbportefolje/api/v2/arbeidsliste?slettFargekategori=false`, {
        data: { fnr: fnr }
    });
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

export function useErUfordeltBruker(fnr: string, enhetId?: string) {
    const url = '/veilarbportefolje/api/v1/hent-er-bruker-ufordelt';
    const { data, error, isLoading } = useSWR<boolean, ErrorMessage>(
        fnr && enhetId ? url : null,
        () => fetchWithPost(url, { fnr: fnr ?? null, enhetId: enhetId }),
        swrOptions
    );
    return { data, isLoading, error };
}

export function useHuskelapp(fnr: string, enhetId?: string) {
    const url = '/veilarbportefolje/api/v1/hent-huskelapp-for-bruker';
    const { data, error, isLoading, mutate } = useSWR<Huskelapp, ErrorMessage>(
        fnr && enhetId ? url : null,
        () => fetchWithPost(url, { fnr: fnr, enhetId: enhetId }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}

export function useArbeidsliste(fnr: string) {
    const url = '/veilarbportefolje/api/v2/hent-arbeidsliste';
    const { data, error, isLoading, mutate } = useSWR<Arbeidsliste, ErrorMessage>(
        fnr ? url : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}

export function useFargekategori(fnr: string) {
    const url = '/veilarbportefolje/api/v1/hent-fargekategori';
    const { data, error, isLoading, mutate } = useSWR<Fargekategori, ErrorMessage>(
        fnr ? url : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}
