import { Options } from 'axios-hooks';
import { axiosInstance, useAxios, UseAxiosResponseValue } from './utils';
import { AxiosResponse } from 'axios';
import { StringOrNothing } from '../util/type/stringornothings';
import { OrNothing } from '../util/type/ornothing';

export type Formidlingsgruppe = 'ARBS' | 'IARBS' | 'ISERV' | 'PARBS' | 'RARBS';
export type Servicegruppe = 'BKART' | 'IVURD' | 'OPPFI' | 'VARIG' | 'VURDI' | 'VURDU';

interface OppfolgingEnhet {
    navn: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface OppfolgingStatus {
    oppfolgingsenhet: OppfolgingEnhet;
    veilederId: StringOrNothing;
    formidlingsgruppe: OrNothing<Formidlingsgruppe>;
    servicegruppe: OrNothing<Servicegruppe>;
}

export interface EskaleringsVarsel {
    varselId: string;
    aktorId: string;
    oppretterAv: string;
    opprettetDato: string;
    avsluttetDato: StringOrNothing;
    tilhorendeDialogId: string;
}

export interface AvslutningStatus {
    harYtelser: boolean;
    inaktiveringsDato: StringOrNothing;
    kanAvslutte: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
}

export interface OppfolgingsPerioder {
    aktorId: string;
    veileder: StringOrNothing;
    startDato: string;
    sluttDato?: string;
    begrunnelse: string;
    kvpPerioder: any[];
}

export interface Oppfolging {
    avslutningStatus: OrNothing<AvslutningStatus>;
    erIkkeArbeidssokerUtenOppfolging: boolean;
    erSykmeldtMedArbeidsgiver: OrNothing<boolean>;
    fnr: string;
    gjeldendeEskaleringsvarsel: OrNothing<EskaleringsVarsel>;
    harSkriveTilgang: boolean;
    inaktivIArena: OrNothing<boolean>;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveres: OrNothing<boolean>;
    kanStarteOppfolging: boolean;
    manuell: boolean;
    oppfolgingUtgang: StringOrNothing;
    oppfolgingsPerioder: OppfolgingsPerioder[];
    reservasjonKRR: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    veilederId: StringOrNothing;
    kanVarsles: boolean;
}

export interface TildelVeilederData {
    fraVeilederId: StringOrNothing;
    tilVeilederId: string;
    brukerFnr: string;
}

export interface TildelVeilederResponse {
    resultat: string;
    feilendeTilordninger: TildelVeilederData[];
    tilVeilederId: StringOrNothing;
}

export interface TilgangTilBrukersKontor {
    tilgangTilBrukersKontor: boolean;
}

export type InnstillingsHistorikkType =
    | 'SATT_TIL_DIGITAL'
    | 'SATT_TIL_MANUELL'
    | 'AVSLUTTET_OPPFOLGINGSPERIODE'
    | 'ESKALERING_STARTET'
    | 'ESKALERING_STOPPET'
    | 'KVP_STARTET'
    | 'KVP_STOPPET'
    | 'VEILEDER_TILORDNET'
    | 'OPPFOLGINGSENHET_ENDRET';

export type InnstillingsHistorikkOpprettetAvType = 'NAV' | 'SYSTEM' | 'EKSTERN';

export interface InnstillingsHistorikk {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: StringOrNothing;
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: StringOrNothing;
    dialogId: OrNothing<number>;
    veileder?: string;
    enhet?: StringOrNothing;
}

export function createFetchOppfolging(
    oppfolgingFetcher: UseAxiosResponseValue<Oppfolging>
): (fnr: string) => Promise<AxiosResponse<Oppfolging>> {
    return (fnr: string) => oppfolgingFetcher.fetch({ url: `/veilarboppfolging/api/oppfolging?fnr=${fnr}` });
}

export function useFetchOppfolgingsstatus(fnr: string, options?: Options): UseAxiosResponseValue<OppfolgingStatus> {
    return useAxios<OppfolgingStatus>({ url: `/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus` }, options);
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

export function useFetchInstillingsHistorikk(
    fnr: string,
    options?: Options
): UseAxiosResponseValue<InnstillingsHistorikk[]> {
    return useAxios<InnstillingsHistorikk[]>(
        { url: `/veilarboppfolging/api/oppfolging/innstillingsHistorikk?fnr=${fnr}` },
        options
    );
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

export function tildelTilVeileder(
    tilordninger: TildelVeilederData[]
): Promise<AxiosResponse<{ resultat: string; feilendeTilordninger: TildelVeilederData[] }>> {
    return axiosInstance.post(`/veilarboppfolging/api/tilordneveileder`, tilordninger);
}
