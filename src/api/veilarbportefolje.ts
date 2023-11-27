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
    endringstidspunkt: OrNothing<Date>;
    frist: OrNothing<Date>;
    harVeilederTilgang: boolean;
    isOppfolgendeVeileder: boolean;
    kommentar: StringOrNothing;
    sistEndretAv: OrNothing<{ veilederId: string }>;
    veilederId?: StringOrNothing;
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
    kommentar: StringOrNothing | null;
    frist: StringOrNothing;
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
    return axiosInstance.post<Arbeidsliste>(`/veilarbportefolje/api/v1/hent-huskelapp-for-bruker`, { fnr: fnr });
}

export function lagreHuskelapp(fnr: string, huskelappformValues: HuskelappformValues): AxiosPromise {
    return axiosInstance.post(`/veilarbportefolje/api/v1/huskelapp`, { ...{ fnr: fnr }, ...huskelappformValues });
}

export function redigerHuskelapp(fnr: string, huskelappformValues: HuskelappformValues): AxiosPromise {
    return axiosInstance.put(`/veilarbportefolje/api/v1/huskelapp`, { ...huskelappformValues, fnr });
}

export function slettHuskelapp(fnr: string): AxiosPromise<Huskelapp> {
    return axiosInstance.delete(`/veilarbportefolje/api/v1/huskelapp`, { data: { fnr: fnr } });
}
