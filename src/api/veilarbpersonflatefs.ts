import { ErrorMessage, get, swrOptions } from './utils';
import useSWR from 'swr';

export const EKSEMPELTOGGLE = 'togglenavn-eksempeltoggle';

export const ALL_TOGGLES = [EKSEMPELTOGGLE];

export interface OboUnleashFeatures {
    [EKSEMPELTOGGLE]: boolean;
}

export const useFeaturesFromOboUnleash = () => {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    const url = `/obo-unleash/api/feature?${features}`;
    const { data, error, isLoading } = useSWR<OboUnleashFeatures, ErrorMessage>(url, () => get(url), swrOptions);
    return { features: data, error, isLoading };
};
