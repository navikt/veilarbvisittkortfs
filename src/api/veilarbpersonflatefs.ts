import { useAxios, UseAxiosResponseValue } from './utils';
import { Options } from 'axios-hooks';

export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const VEDTAKSSTTOTTE_PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const ALL_TOGGLES = [PILOT_TOGGLE, VEDTAKSSTTOTTE_PRELANSERING_TOGGLE];

export interface Features {
    [PILOT_TOGGLE]: boolean;
    [VEDTAKSSTTOTTE_PRELANSERING_TOGGLE]: boolean;
}

export function useFetchFeatures(options?: Options): UseAxiosResponseValue<Features> {
    const features = ALL_TOGGLES.map((element) => 'feature=' + element).join('&');
    return useAxios<Features>({ url: `/veilarbpersonflatefs/api/feature?feature=${features}` }, options);
}
