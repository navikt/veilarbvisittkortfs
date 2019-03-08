import { fetchToJson } from './api-utils';

export interface FeatureApi {
    hentFeatures: (feature: string) => Promise<any>;
}

function hentFeatures(feature: string) {
    return fetchToJson(`/veilarbpersonflatefs/api/feature?feature=${feature}`);
}

export default {
    hentFeatures
} as FeatureApi;