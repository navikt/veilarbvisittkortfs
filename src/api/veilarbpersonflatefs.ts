import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING =
    'veilarbvisittkortfs.vis-ny-inngang-til-arbeidsrettet-oppfolging';
export const BRUK_GJELDENDE_14A_SOM_KILDE_FOR_PROFILERINGSETIKETTER =
    'veilarbvisittkortfs.bruk_gjeldende_14a_som_kilde_for_profileringsetiketter';
export const BRUK_GJELDENDE_14A_SOM_KILDE_FOR_TRENGER_VURDERING_ETIKETT =
    'veilarbvisittkortfs.bruk_gjeldende_14a_som_kilde_for_trenger_vurdering_etikett';
export const VIS_I_ARBEIDSSOKERREGISTERET_ETIKETT = 'veilarbvisittkortfs.vis_i_arbeidssokerregisteret_etikett';

export const ALL_TOGGLES = [
    VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING,
    BRUK_GJELDENDE_14A_SOM_KILDE_FOR_TRENGER_VURDERING_ETIKETT,
    BRUK_GJELDENDE_14A_SOM_KILDE_FOR_PROFILERINGSETIKETTER,
    VIS_I_ARBEIDSSOKERREGISTERET_ETIKETT
];

export interface OboUnleashFeatures {
    [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING]: boolean;
    [BRUK_GJELDENDE_14A_SOM_KILDE_FOR_PROFILERINGSETIKETTER]: boolean;
    [BRUK_GJELDENDE_14A_SOM_KILDE_FOR_TRENGER_VURDERING_ETIKETT]: boolean;
    [VIS_I_ARBEIDSSOKERREGISTERET_ETIKETT]: boolean;
}

export function fetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
