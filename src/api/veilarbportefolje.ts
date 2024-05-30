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
    endretAv: StringOrNothing;
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
}

export enum FargekategoriModell {
    FARGEKATEGORI_A = 'FARGEKATEGORI_A',
    FARGEKATEGORI_B = 'FARGEKATEGORI_B',
    FARGEKATEGORI_C = 'FARGEKATEGORI_C',
    FARGEKATEGORI_D = 'FARGEKATEGORI_D',
    FARGEKATEGORI_E = 'FARGEKATEGORI_E',
    FARGEKATEGORI_F = 'FARGEKATEGORI_F',
    INGEN_KATEGORI = 'INGEN_KATEGORI'
}
type UtvidetFargekategoriModell = {
    key: FargekategoriModell;
    beskrivelse: string;
};
export const utvidetFargekategoriModell: UtvidetFargekategoriModell[] = [
    { key: FargekategoriModell.FARGEKATEGORI_A, beskrivelse: 'Kategori blå (vimpel)' },
    { key: FargekategoriModell.FARGEKATEGORI_B, beskrivelse: 'Kategori grønn (trekant)' },
    { key: FargekategoriModell.FARGEKATEGORI_C, beskrivelse: 'Kategori gul (sirkel)' },
    { key: FargekategoriModell.FARGEKATEGORI_D, beskrivelse: 'Kategori lilla (firkant)' },
    { key: FargekategoriModell.FARGEKATEGORI_E, beskrivelse: 'Kategori lyseblå (femkant)' },
    { key: FargekategoriModell.FARGEKATEGORI_F, beskrivelse: 'Kategori oransje (diamant)' },
    { key: FargekategoriModell.INGEN_KATEGORI, beskrivelse: 'Ingen fargekategori' }
];

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

export function slettArbeidslisteMenIkkeFargekategori(fnr: string): AxiosPromise<Arbeidsliste> {
    return axiosInstance.delete(`/veilarbportefolje/api/v2/arbeidsliste?slettFargekategori=false`, {
        data: { fnr: fnr }
    });
}

export function fetchHuskelapp(fnr: string, enhetId: string): AxiosPromise<Huskelapp> {
    return axiosInstance.post(`/veilarbportefolje/api/v1/hent-huskelapp-for-bruker`, { fnr: fnr, enhetId: enhetId });
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

export function fetchFargekategori(fnr: string): AxiosPromise<Fargekategori> {
    return axiosInstance.post('/veilarbportefolje/api/v1/hent-fargekategori', { fnr });
}
