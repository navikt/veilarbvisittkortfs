import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
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
}

export interface Huskelapp {
    huskelappId: StringOrNothing;
    frist: OrNothing<Date>;
    kommentar: StringOrNothing;
    endretDato: OrNothing<Date>;
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

export function fetchArbeidsliste(fnr: string): AxiosPromise<Arbeidsliste> {
    return axiosInstance.post<Arbeidsliste>(`/veilarbportefolje/api/v2/hent-arbeidsliste`, { fnr: fnr });
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

export function fetchHuskelapp(fnr: string): AxiosPromise<Huskelapp> {
    return axiosInstance.post(`/veilarbportefolje/api/v1/hent-huskelapp-for-bruker`, { fnr: fnr });
}

export function lagreHuskelapp(huskelappformValues: HuskelappLagreValues): AxiosPromise<String> {
    return axiosInstance.post(`/veilarbportefolje/api/v1/huskelapp`, huskelappformValues);
}

export function redigerHuskelapp(huskelappformValues: HuskelappRedigerValues): AxiosPromise {
    return axiosInstance.put(`/veilarbportefolje/api/v1/huskelapp`, huskelappformValues);
}

export function slettHuskelapp(huskelappId: string): AxiosPromise<String> {
    return axiosInstance.delete(`/veilarbportefolje/api/v1/huskelapp`, { data: { huskelappId: huskelappId } });
}
