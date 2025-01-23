import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING =
    'veilarbvisittkortfs.vis-ny-inngang-til-arbeidsrettet-oppfolging';

export const ALL_TOGGLES = [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING];

export interface OboUnleashFeatures {
    [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING]: boolean;
}

export function fetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
