import { Options } from 'axios-hooks';
import { useAxios, UseAxiosResponseValue } from './utils';

export interface VeilederData {
    ident: string;
    navn: string;
    fornavn: string;
    etternavn: string;
}

export interface VeilederListe {
    veilederListe: VeilederData[];
}

export interface EnhetData {
    enhetId: string;
    navn: string;
}

export function useFetchInnloggetVeileder(options?: Options): UseAxiosResponseValue<VeilederData> {
    return useAxios<VeilederData>({ url: `/veilarbveileder/api/veileder/me` }, options);
}

export function useFetchVeilederePaEnhet(enhetId: string, options?: Options): UseAxiosResponseValue<VeilederListe> {
    return useAxios<VeilederListe>({ url: `/veilarbveileder/api/enhet/${enhetId}/veiledere` }, options);
}

export function useFetchEnhetNavn(enhetId: string, options?: Options): UseAxiosResponseValue<EnhetData> {
    return useAxios<EnhetData>({ url: `/veilarbveileder/api/enhet/${enhetId}/navn` }, options);
}
