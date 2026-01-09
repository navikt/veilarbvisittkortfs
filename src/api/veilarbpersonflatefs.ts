import { ErrorMessage, get, swrOptions } from './utils';
import useSWR from 'swr';

export const VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING =
    'veilarbvisittkortfs.vis-ny-inngang-til-arbeidsrettet-oppfolging';

export const ALL_TOGGLES = [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING];

export interface OboUnleashFeatures {
    [VIS_NY_INNGANG_TIL_ARBEIDSRETTET_OPPFOLGING]: boolean;
}

export const useFeaturesFromOboUnleash = () => {
    const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
    const url = `/obo-unleash/api/feature?${features}`;
    const { data, error, isLoading } = useSWR<OboUnleashFeatures, ErrorMessage>(url, () => get(url), swrOptions);
    return { features: data, error, isLoading };
};
