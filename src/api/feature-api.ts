import {fetchToJson} from './api-utils';

export interface FeatureApi {
    hentFeatures: (feature: string) => Promise<{}>;
}

function hentFeatures(feature: string) {
    return fetchToJson(`/api/feature?feature=${feature}`);
}


export default {
    hentFeatures
} as FeatureApi;