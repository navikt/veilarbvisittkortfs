import { AxiosResponse } from 'axios';
import { axiosInstance, useAxios, UseAxiosResponseValue } from './utils';
import { Options } from 'axios-hooks';
import { StringOrNothing } from '../util/type/stringornothings';
import { OrNothing } from '../util/type/ornothing';

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

export enum KategoriModell {
    BLA = 'BLA',
    LILLA = 'LILLA',
    GRONN = 'GRONN',
    GUL = 'GUL',
    TOM = 'TOM',
}

export interface ArbeidslisteformValues {
    kommentar: StringOrNothing;
    frist: StringOrNothing;
    overskrift: StringOrNothing;
    kategori: KategoriModell | null;
}

export function useFetchArbeidsliste(fnr: string, options?: Options): UseAxiosResponseValue<Arbeidsliste> {
    return useAxios<Arbeidsliste>({ url: `/veilarbportefolje/api/arbeidsliste/${fnr}` }, options);
}

export function lagreArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

export function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): Promise<AxiosResponse> {
    return axiosInstance.put(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

export function slettArbeidsliste(fnr: string): Promise<AxiosResponse> {
    return axiosInstance.delete(`/veilarbportefolje/api/arbeidsliste/${fnr}`);
}
