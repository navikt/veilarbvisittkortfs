import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const BRUK_GAMMEL_ARBEIDSREGISTRERING_URL = 'veilarbvisitkortfs.bruk-gammel-arbeidsregistrering-url';
export const VIS_NY_INNGANG = 'veilarbvisitkortfs.vis-ny-inngang';

export const ALL_TOGGLES = [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL];

export interface OboUnleashFeatures {
    [BRUK_GAMMEL_ARBEIDSREGISTRERING_URL]: boolean;
    [VIS_NY_INNGANG]: boolean;
}

export function fetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
