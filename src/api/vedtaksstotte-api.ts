import { fetchToJson } from './api-utils';

const VEDTAKS_URL = '/veilarbvedtaksstotte/api';

export interface VedtaksstotteApi {
    fetchHarUtkast: (fnr: string) => Promise<boolean>;
}

function fetchHarUtkast(fnr: string) {
    return fetchToJson(`${VEDTAKS_URL}/${fnr}/harutkast`);

}

export default {
    fetchHarUtkast: fetchHarUtkast
} as VedtaksstotteApi;