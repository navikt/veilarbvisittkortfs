import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, get, swrOptions } from './utils';
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

export const useVeilederDataListe = (identer: string[] | null) => {
    const url = '/veilarbveileder/api/veileder/list';
    const { data, error, isLoading } = useSWR<VeilederData[]>(
        identer ? [...identer] : null,
        () => fetchWithPost(url, { identer } as VeilederDataListeRequest),
        swrOptions
    );
    return {
        veilederListeData: data,
        veilederListeLoading: isLoading,
        veilederListeError: error
    };
};

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
