import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export interface VeilederData {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

export interface VeilederListe {
    veilederListe: VeilederData[];
}

export interface EnhetData {
    enhetId: string;
    navn: string;
}

export function fetchInnloggetVeileder(): AxiosPromise<VeilederData> {
    return axiosInstance.get<VeilederData>(`/veilarbveileder/api/veileder/me`);
}

export function fetchVeilederePaEnhet(enhetId: string): AxiosPromise<VeilederListe> {
    return axiosInstance.get<VeilederListe>(`/veilarbveileder/api/enhet/${enhetId}/veiledere`);
}

export function fetchEnhetNavn(enhetId: string): AxiosPromise<EnhetData> {
    return axiosInstance.get<EnhetData>(`/veilarbveileder/api/enhet/${enhetId}/navn`);
}
