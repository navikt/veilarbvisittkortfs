import { useAxios, UseAxiosResponseValue } from './utils';
import { Options } from 'axios-hooks';
import { OppfolgingStatus } from './data/oppfolging-status';
import { VeilederData, VeilederListe } from './data/veilederdata';
import { Personalia } from './data/personalia';
import { HarBruktNivaa4Type } from './data/har-brukt-nivaa4';
import { TilgangTilBrukersKontor } from './data/tilgangtilbrukerskontor';
import { Arbeidsliste } from './data/arbeidsliste';
import { RegistreringData } from './registrering-api';
import { Oppfolging } from './data/oppfolging';
import { ALL_TOGGLES, Features } from './data/features';

export function useFetchOppfolgingsstatus(fnr: string, options?: Options): UseAxiosResponseValue<OppfolgingStatus> {
    return useAxios<OppfolgingStatus>({ url: `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus` }, options);
}

export function useFetchOppfolging(fnr: string, options?: Options): UseAxiosResponseValue<Oppfolging> {
    return useAxios<Oppfolging>({ url: `/veilarboppfolging/api/oppfolging?fnr=${fnr}` }, options);
}

export function useFetchInnloggetVeileder(options?: Options): UseAxiosResponseValue<VeilederData> {
    return useAxios<VeilederData>({ url: `/veilarbveileder/api/veileder/me` }, options);
}

export function useFetchPersonalia(fnr: string, options?: Options): UseAxiosResponseValue<Personalia> {
    return useAxios<Personalia>({ url: `/veilarbperson/api/person/${fnr}` }, options);
}

export function useFetchHarNivaa4(fnr: string, options?: Options): UseAxiosResponseValue<HarBruktNivaa4Type> {
    return useAxios<HarBruktNivaa4Type>({ url: `/veilarbperson/api/person/${fnr}/harNivaa4` }, options);
}

export function useFetchTilgangTilBrukersKontor(
    fnr: string,
    options?: Options
): UseAxiosResponseValue<TilgangTilBrukersKontor> {
    return useAxios<TilgangTilBrukersKontor>(
        { url: `/veilarboppfolging/api/oppfolging/veilederTilgang?fnr=${fnr}` },
        options
    );
}

export function useFetchVeilederePaEnhet(enhetId: string, options?: Options): UseAxiosResponseValue<VeilederListe> {
    return useAxios<VeilederListe>({ url: `/veilarbveileder/api/enhet/${enhetId}/veiledere` }, options);
}

export function useFetchArbeidsliste(fnr: string, options?: Options): UseAxiosResponseValue<Arbeidsliste> {
    return useAxios<Arbeidsliste>({ url: `/veilarbportefolje/api/arbeidsliste/${fnr}` }, options);
}

export function useFetchRegistrering(fnr: string, options?: Options): UseAxiosResponseValue<RegistreringData> {
    return useAxios<RegistreringData>({ url: `/veilarbregistrering/api/registrering?fnr=${fnr}` }, options);
}

export function useFetchFeatures(options?: Options): UseAxiosResponseValue<Features> {
    const features = ALL_TOGGLES.map((element) => 'feature=' + element).join('&');
    return useAxios<Features>({ url: `/veilarbpersonflatefs/api/feature?feature=${features}` }, options);
}
