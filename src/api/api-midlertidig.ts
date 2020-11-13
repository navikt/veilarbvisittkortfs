import { useAxios, UseAxiosResponseValue } from './utils';
import { Options } from 'axios-hooks';
import { OppfolgingStatus } from './data/oppfolging-status';

export function useFetchOppfolgingsstatus(fnr: string, options?: Options): UseAxiosResponseValue<OppfolgingStatus> {
    return useAxios<OppfolgingStatus>({ url: `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus` }, options);
}

export function useFetchOppfolging(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarboppfolging/api/oppfolging?fnr=${fnr}` }, options);
}

export function useFetchInnloggetVeileder(options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbveileder/api/veileder/me` }, options);
}

export function useFetchPerson(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbperson/api/person/${fnr}` }, options);
}

export function useFetchHarNivaa4(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbperson/api/person/${fnr}/harNivaa4` }, options);
}

export function useFetchHarVeilederTilgang(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarboppfolging/api/oppfolging/veilederTilgang?fnr=${fnr}` }, options);
}

export function useFetchVeilederePaEnhet(enhetId: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbveileder/api/enhet/${enhetId}/veiledere` }, options);
}

export function useFetchArbeidsliste(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbportefolje/api/arbeidsliste/${fnr}` }, options);
}

export function useFetchRegistrering(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbregistrering/api/registrering?fnr=${fnr}` }, options);
}
