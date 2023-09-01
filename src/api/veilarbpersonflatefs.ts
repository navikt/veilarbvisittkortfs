import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const VEILARBDETALJERFS_ENABLED = 'veilarbpersonflatefs.veilarbdetaljerfs-enabled';
export const ALL_TOGGLES = [PILOT_TOGGLE, VEILARBDETALJERFS_ENABLED];

export interface FeatureToggles {
    [PILOT_TOGGLE]: boolean;
    [VEILARBDETALJERFS_ENABLED]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<FeatureToggles>(`/veilarbpersonflatefs/api/feature?feature=${features}`);
}
