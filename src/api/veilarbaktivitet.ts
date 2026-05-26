import { axiosInstance, get } from './utils';
import { AxiosPromise } from 'axios';
import useSWR from 'swr';

export function fetchHarArenaTiltak(fnr: string): AxiosPromise<boolean> {
    return axiosInstance.get<boolean>(`/veilarbaktivitet/api/arena/harTiltak?fnr=${fnr}`);
}

const BRUK_AO_KONTOR_SOM_MASTER = 'bruk_ao_kontor_som_master';
interface DabUnleashFeatures {
    [BRUK_AO_KONTOR_SOM_MASTER]: boolean;
}
const togglesQueryParam = [BRUK_AO_KONTOR_SOM_MASTER].map(element => 'feature=' + element).join('&');
const dabUnleashTogglesUrl = `/veilarbaktivitet/api/feature?${togglesQueryParam}`;

export const useBrukAoKontorSomMaster = () => {
    const { data } = useSWR<DabUnleashFeatures>(dabUnleashTogglesUrl, () => get(dabUnleashTogglesUrl));
    return data ? data[BRUK_AO_KONTOR_SOM_MASTER] || false : false;
};
