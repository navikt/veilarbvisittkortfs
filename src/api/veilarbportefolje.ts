import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
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

export function fetchArbeidsliste(fnr: string): AxiosPromise<Arbeidsliste> {
    return axiosInstance.get<Arbeidsliste>(`/veilarbportefolje/api/arbeidsliste/${fnr}`);
}

export function lagreArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): AxiosPromise {
    return axiosInstance.post(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

export function redigerArbeidsliste(fnr: string, arbeidsliste: ArbeidslisteformValues): AxiosPromise {
    return axiosInstance.put(`/veilarbportefolje/api/arbeidsliste/${fnr}`, arbeidsliste);
}

export function slettArbeidsliste(fnr: string): AxiosPromise {
    return axiosInstance.delete(`/veilarbportefolje/api/arbeidsliste/${fnr}`);
}
