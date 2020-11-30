import { Options } from 'axios-hooks';
import { useAxios, UseAxiosResponseValue } from './utils';

export function useFetchHarUtkast(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbvedtaksstotte/api/${fnr}/harUtkast` }, options);
}
