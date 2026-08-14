import { ErrorMessage, get, swrOptions } from './utils';
import useSWR from 'swr';

export const EKSEMPELTOGGLE = 'togglenavn-eksempeltoggle';
export const DARKMODE_VISITTKORT_TOGGLE = 'veilarbvisittkort.darkmode';
export const MINIMERT_PDL_DATA = 'veilarbvisittkortfs.minimert_pdldata';

export const ALL_TOGGLES = [EKSEMPELTOGGLE, DARKMODE_VISITTKORT_TOGGLE, MINIMERT_PDL_DATA];

export interface OboUnleashFeatures {
    [EKSEMPELTOGGLE]: boolean;
    [DARKMODE_VISITTKORT_TOGGLE]: boolean;
    [MINIMERT_PDL_DATA]: boolean;
}

export const useFeaturesFromOboUnleash = () => {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    const url = `/obo-unleash/api/feature?${features}`;
    const { data, error, isLoading } = useSWR<OboUnleashFeatures, ErrorMessage>(url, () => get(url), swrOptions);
    return { features: data, error, isLoading };
};
