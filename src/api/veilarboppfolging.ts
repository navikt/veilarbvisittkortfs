import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
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

export interface InnstillingHistorikkInnslag {
    type: InnstillingsHistorikkType;
    dato: string;
    begrunnelse: StringOrNothing;
    opprettetAv: InnstillingsHistorikkOpprettetAvType;
    opprettetAvBrukerId: StringOrNothing;
    dialogId: OrNothing<number>;
    veileder?: string;
    enhet?: StringOrNothing;
}

export function fetchOppfolging(fnr: string): AxiosPromise<Oppfolging> {
    return axiosInstance.get(`/veilarboppfolging/api/oppfolging?fnr=${fnr}`);
}

export function fetchOppfolgingsstatus(fnr: string): AxiosPromise<OppfolgingStatus> {
    return axiosInstance.get<OppfolgingStatus>(`/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`);
}

export function fetchTilgangTilBrukersKontor(fnr: string): AxiosPromise<TilgangTilBrukersKontor> {
    return axiosInstance.get<TilgangTilBrukersKontor>(`/veilarboppfolging/api/oppfolging/veilederTilgang?fnr=${fnr}`);
}

export function fetchInstillingsHistorikk(fnr: string): AxiosPromise<InnstillingHistorikkInnslag[]> {
    return axiosInstance.get<InnstillingHistorikkInnslag[]>(
        `/veilarboppfolging/api/oppfolging/innstillingsHistorikk?fnr=${fnr}`
    );
}

export function fetchAvsluttOppfolgingStatus(fnr: string): AxiosPromise<AvslutningStatus> {
    return axiosInstance.get(`/veilarboppfolging/api/oppfolging/avslutningStatus?fnr=${fnr}`);
}

export function settBrukerTilDigital(fnr: string, veilederId: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/settDigital?fnr=${fnr}`, {
        begrunnelse,
        veilederId
    });
}

export function settBrukerTilManuell(fnr: string, veilederId: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/settManuell?fnr=${fnr}`, {
        begrunnelse,
        veilederId
    });
}

export function startKvpOppfolging(fnr: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/startKvp?fnr=${fnr}`, {
        begrunnelse
    });
}

export function stoppKvpOppfolging(fnr: string, begrunnelse: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/stoppKvp?fnr=${fnr}`, {
        begrunnelse
    });
}

export function startEskalering(dialogId: string, begrunnelse: string, fnr: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/startEskalering/?fnr=${fnr}`, {
        dialogId,
        begrunnelse
    });
}

export function stoppEskalering(fnr: string, begrunnelse?: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/stoppEskalering/?fnr=${fnr}`, {
        begrunnelse
    });
}

export function avsluttOppfolging(fnr: string, begrunnelse: string, veilederId: string): AxiosPromise {
    return axiosInstance.post(`/veilarboppfolging/api/oppfolging/avsluttOppfolging?fnr=${fnr}`, {
        begrunnelse,
        veilederId
    });
}

export function tildelTilVeileder(
    tilordninger: TildelVeilederData[]
): AxiosPromise<{ resultat: string; feilendeTilordninger: TildelVeilederData[] }> {
    return axiosInstance.post(`/veilarboppfolging/api/tilordneveileder`, tilordninger);
}
