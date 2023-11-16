import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const BRUK_GAMMEL_ARBEIDSREGISTRERING_URL = 'veilarbvisitkortfs.bruk-gammel-arbeidsregistrering-url';
export const ALL_TOGGLES = [PILOT_TOGGLE, BRUK_GAMMEL_ARBEIDSREGISTRERING_URL];

export interface OboUnleashFeatures {
    [PILOT_TOGGLE]: boolean;
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: boolean;
}

export function useFetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
