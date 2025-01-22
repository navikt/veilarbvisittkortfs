import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const VIS_NY_INNGANG = 'veilarbvisitkortfs.vis-ny-inngang';

export const ALL_TOGGLES = [VIS_NY_INNGANG];

export interface OboUnleashFeatures {
    [VIS_NY_INNGANG]: boolean;
}

export function fetchFeaturesFromOboUnleash(): AxiosPromise<OboUnleashFeatures> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<OboUnleashFeatures>(`/obo-unleash/api/feature?${features}`);
}
