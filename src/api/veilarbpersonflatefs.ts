import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const VEDTAKSSTTOTTE_PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const HENT_PERSONDATA_FRA_PDL_TOGGLE = 'veilarbvisitkortfs.persondata.fra.pdl';
export const ALL_TOGGLES = [PILOT_TOGGLE, VEDTAKSSTTOTTE_PRELANSERING_TOGGLE, HENT_PERSONDATA_FRA_PDL_TOGGLE];

export interface FeatureToggles {
    [PILOT_TOGGLE]: boolean;
    [VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]: boolean;
    [HENT_PERSONDATA_FRA_PDL_TOGGLE]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    return axiosInstance.get<FeatureToggles>(`/veilarbpersonflatefs/api/feature?feature=${features}`);
}
