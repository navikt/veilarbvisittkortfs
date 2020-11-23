import { axiosInstance, useAxios, UseAxiosResponseValue } from './utils';
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
import { InnstillingsHistorikk } from './data/innstillings-historikk';
import { OppgaveHistorikk } from './data/oppgave-historikk';
import { EnhetData } from './data/enhet';
import { AxiosResponse } from 'axios';
import { OppgaveFormData, OppgaveFormResponse } from './data/oppgave';
import { HenvendelseData } from '../store/dialog/actions';
import Dialog from './data/dialog';

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

export function useFetchInstillingsHistorikk(
    fnr: string,
    options?: Options
): UseAxiosResponseValue<InnstillingsHistorikk[]> {
    return useAxios<InnstillingsHistorikk[]>(
        { url: `/veilarboppfolging/api/oppfolging/innstillingsHistorikk?fnr=${fnr}` },
        options
    );
}

export function useFetchOppgaveHistorikk(fnr: string, options?: Options): UseAxiosResponseValue<OppgaveHistorikk[]> {
    return useAxios<OppgaveHistorikk[]>({ url: `/veilarboppgave/api/oppgavehistorikk?fnr=${fnr}` }, options);
}

export function useFetchEnhetNavn(enhetId: string, options?: Options): UseAxiosResponseValue<EnhetData> {
    return useAxios<EnhetData>({ url: `/veilarbveileder/api/enhet/${enhetId}/navn` }, options);
}

export function useFetchHarUtkast(fnr: string, options?: Options): UseAxiosResponseValue<true> {
    return useAxios<true>({ url: `/veilarbvedtaksstotte/api/${fnr}/harUtkast` }, options);
}

export function opprettOppgave(
    fnr: string,
    oppgaveFormData: OppgaveFormData
): Promise<AxiosResponse<OppgaveFormResponse>> {
    return axiosInstance.post(`/veilarboppgave/api/oppgave?fnr=${fnr}`, oppgaveFormData);
}

export function settBrukerTilDigital(fnr: string, veilederId: string, begrunnelse: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/settDigital?fnr=${fnr}`, {
        begrunnelse,
        veilederId,
    });
}

export function settBrukerTilManuell(fnr: string, veilederId: string, begrunnelse: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/settManuell?fnr=${fnr}`, {
        begrunnelse,
        veilederId,
    });
}

export function startKvpOppfolging(fnr: string, begrunnelse: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/startKvp?fnr=${fnr}`, {
        begrunnelse,
    });
}

export function stoppKvpOppfolging(fnr: string, begrunnelse: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/stoppKvp?fnr=${fnr}`, {
        begrunnelse,
    });
}

export function nyHenvendelse(fnr: string, henvendelse: HenvendelseData): Promise<AxiosResponse<Dialog>> {
    return axiosInstance.post(`/veilarbdialog/api/dialog?fnr=${fnr}`, henvendelse);
}

export function oppdaterFerdigbehandlet(
    dialogId: string,
    erFerdigbehandlet: boolean,
    fnr: string
): Promise<AxiosResponse> {
    return axiosInstance.put(`/veilarbdialog/api/dialog/${dialogId}/ferdigbehandlet/${erFerdigbehandlet}?fnr=${fnr}`);
}

export function oppdaterVenterPaSvar(dialogId: string, venterPaSvar: boolean, fnr: string): Promise<AxiosResponse> {
    return axiosInstance.put(`/veilarbdialog/api/dialog/${dialogId}/venter_pa_svar/${venterPaSvar}?fnr=${fnr}`);
}

export function startEskalering(dialogId: string, begrunnelse: string, fnr: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/startEskalering/?fnr=${fnr}`, {
        dialogId,
        begrunnelse,
    });
}

export function stoppEskalering(fnr: string, begrunnelse?: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/stoppEskalering/?fnr=${fnr}`, {
        begrunnelse,
    });
}

export function avsluttOppfolging(fnr: string, begrunnelse: string, veilederId: string): Promise<AxiosResponse> {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/avsluttOppfolging?fnr=${fnr}`, {
        begrunnelse,
        veilederId,
    });
}
