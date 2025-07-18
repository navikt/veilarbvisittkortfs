import useSWR from 'swr';
import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { OrNothing, StringOrNothing } from '../util/type/utility-types';

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

export interface AvslutningStatus {
    harYtelser: boolean;
    inaktiveringsDato: StringOrNothing;
    kanAvslutte: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    erIserv: boolean;
    harAktiveTiltaksdeltakelser: boolean;
}

export interface OppfolgingsPerioder {
    aktorId: string;
    veileder: StringOrNothing;
    startDato: string;
    sluttDato?: string;
    begrunnelse: string;
    kvpPerioder: any[]; // eslint-disable-line
}

export interface Oppfolging {
    erIkkeArbeidssokerUtenOppfolging: boolean;
    erSykmeldtMedArbeidsgiver: OrNothing<boolean>;
    fnr: string;
    harSkriveTilgang: boolean;
    inaktivIArena: OrNothing<boolean>;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveres: OrNothing<boolean>;
    kanStarteOppfolging: boolean;
    kanVarsles: boolean;
    manuell: boolean;
    oppfolgingUtgang: StringOrNothing;
    oppfolgingsPerioder: OppfolgingsPerioder[];
    reservasjonKRR: boolean;
    registrertKRR: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    veilederId: StringOrNothing;
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
    | 'STARTET_OPPFOLGINGSPERIODE'
    | 'AVSLUTTET_OPPFOLGINGSPERIODE'
    | 'REAKTIVERT_OPPFOLGINGSPERIODE'
    | 'KVP_STARTET'
    | 'KVP_STOPPET'
    | 'VEILEDER_TILORDNET'
    | 'OPPFOLGINGSENHET_ENDRET';

export type InnstillingsHistorikkOpprettetAvType = 'NAV' | 'SYSTEM' | 'EKSTERN';

export interface InnstillingHistorikkInnslag {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: StringOrNothing;
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: StringOrNothing;
    opprettetAvBrukerNavn?: StringOrNothing;
    dialogId: OrNothing<number>;
    veileder?: string;
    enhet?: StringOrNothing;
}

export function fetchOppfolging(fnr: string): AxiosPromise<Oppfolging> {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/hent-status`, { fnr: fnr });
}

export function fetchInstillingsHistorikk(fnr: string): AxiosPromise<InnstillingHistorikkInnslag[]> {
    return axiosInstance.post<InnstillingHistorikkInnslag[]>(`/veilarboppfolging/api/v3/hent-instillingshistorikk`, {
        fnr: fnr
    });
}

export function fetchAvsluttOppfolgingStatus(fnr: string): AxiosPromise<AvslutningStatus> {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/hent-avslutning-status`, { fnr: fnr });
}

export function settBrukerTilDigital(fnr: string, veilederId: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/settDigital`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function settBrukerTilManuell(fnr: string, veilederId: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/settManuell`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function startKvpOppfolging(fnr: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/startKvp`, {
        fnr,
        begrunnelse
    });
}

export function stoppKvpOppfolging(fnr: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/stoppKvp`, {
        fnr,
        begrunnelse
    });
}

export function avsluttOppfolging(
    fnr: string,
    begrunnelse: string,
    veilederId: string
): AxiosPromise<AvslutningStatus> {
    return axiosInstance.post(`/veilarboppfolging/api/v2/oppfolging/avslutt`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function tildelTilVeileder(
    tilordninger: TildelVeilederData[]
): AxiosPromise<{ resultat: string; feilendeTilordninger: TildelVeilederData[] }> {
    return axiosInstance.post(`/veilarboppfolging/api/tilordneveileder`, tilordninger);
}

export function useOppfolgingsstatus(fnr: string) {
    const url = '/veilarboppfolging/api/v2/person/hent-oppfolgingsstatus';
    const { data, error, isLoading, mutate } = useSWR<OppfolgingStatus, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error, mutate };
}

export function useTilgangTilBrukersKontor(fnr: string) {
    const url = '/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang';
    const { data, error, isLoading } = useSWR<TilgangTilBrukersKontor, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr }),
        swrOptions
    );
    return { data, isLoading, error };
}
