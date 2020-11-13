import { useAxios, UseAxiosResponseValue } from './utils';
import { Options } from 'axios-hooks';

export function useFetchTilgangTilBruker(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbperson/api/person/${fnr}/tilgangTilBruker` }, options);
}

//
//
// /veilarboppfolging/api/person/10108000398/oppfolgingsstatu
//
// /veilarboppfolging/api/oppfolging?fnr=1010800039
//
//     veilarbveileder/api/veileder/me
//
//     /veilarbperson/api/person/1010800039
//
// veilarboppfolging/api/oppfolging/veilederTilgang?fnr=10108000398
//
//     veilarbperson/api/person/10108000398/harNivaa4
//
//     /veilarbveileder/api/enhet/007/veiledere
//
//     /veilarbportefolje/api/arbeidsliste/10108000398/
//
//
//     /veilarbregistrering/api/registrering?fnr=123456
