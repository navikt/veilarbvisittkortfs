import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, get, swrOptions } from './utils';
import useSWR from 'swr';

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

export type VeilederDataListeRequest = { identer: string[] };

export const useInnloggetVeileder = () => {
    const url = '/veilarbveileder/api/veileder/me';
    const { data, error, isLoading } = useSWR<VeilederData, ErrorMessage>(url, () => get(url), swrOptions);
    return { innloggetVeileder: data, error, isLoading };
};

export function fetchVeilederDataListe(
    veilederDataListeRequest: VeilederDataListeRequest
): AxiosPromise<VeilederData[]> {
    return axiosInstance.post<VeilederData[]>('/veilarbveileder/api/veileder/list', veilederDataListeRequest);
}

export const useVeilederePaEnhet = (enhetId: string | undefined) => {
    const url = `/veilarbveileder/api/enhet/${enhetId}/veiledere`;
    const { data, error, isLoading } = useSWR<VeilederListe, ErrorMessage>(
        enhetId ? url : null,
        () => get(url),
        swrOptions
    );
    return { veilederePaEnhet: data, error, isLoading };
};

export function fetchEnhetNavn(enhetId: string): AxiosPromise<EnhetData> {
    return axiosInstance.get<EnhetData>(`/veilarbveileder/api/enhet/${enhetId}/navn`);
}
