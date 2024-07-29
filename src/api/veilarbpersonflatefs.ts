import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const BRUK_GAMMEL_ARBEIDSREGISTRERING_URL = 'veilarbvisitkortfs.bruk-gammel-arbeidsregistrering-url';

export const HUSKELAPP = 'veilarbportefoljeflatefs.huskelapp';

export const BRUK_NY_KILDE_TIL_FULLMAKT = 'obo.personflate.reprfullmakt';

export const ALL_TOGGLES = [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL, HUSKELAPP, BRUK_NY_KILDE_TIL_FULLMAKT];

export interface OboUnleashFeatures {
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: boolean;
    [HUSKELAPP]: boolean;
    [BRUK_NY_KILDE_TIL_FULLMAKT]: boolean;
}

export function useFetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
