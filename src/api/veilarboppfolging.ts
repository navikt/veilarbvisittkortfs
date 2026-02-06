import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { OrNothing, StringOrNothing } from '../util/type/utility-types';
import { GraphqlResponse } from './GraphqlUtils';

export type Formidlingsgruppe = 'ARBS' | 'IARBS' | 'ISERV' | 'PARBS' | 'RARBS';
export type Servicegruppe = 'BKART' | 'IVURD' | 'OPPFI' | 'VARIG' | 'VURDI' | 'VURDU';
type Kvalifiseringsgruppe =
    | 'BATT' // Spesielt tilpasset innsats:	                Personen har nedsatt arbeidsevne og har et identifisert behov for kvalifisering og/eller tilrettelegging.  Aktivitetsplan skal utformes.
    | 'BFORM' // Situasjonsbestemt innsats:	                    Personen har moderat bistandsbehov
    | 'BKART' // Behov for arbeidsevnevurdering:	            Personen har behov for arbeidsevnevurdering
    | 'IKVAL' // Standardinnsats:	                            Personen har behov for ordinær bistand
    | 'IVURD' // Ikke vurdert:	                                Ikke vurdert
    | 'KAP11' // Rettigheter etter Ftrl. Kapittel 11:	        Rettigheter etter Ftrl. Kapittel 11
    | 'OPPFI' // Helserelatert arbeidsrettet oppfølging i NAV:	Helserelatert arbeidsrettet oppfølging i NAV
    | 'VARIG' // Varig tilpasset innsats:	                    Personen har varig nedsatt arbeidsevne
    | 'VURDI' // Sykmeldt, oppfølging på arbeidsplassen:	    Sykmeldt, oppfølging på arbeidsplassen
    | 'VURDU'; // Sykmeldt uten arbeidsgiver:

interface OppfolgingEnhet {
    navn: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface OppfolgingStatus {
    oppfolgingsenhet: OppfolgingEnhet;
    veilederId: StringOrNothing;
    formidlingsgruppe: OrNothing<Formidlingsgruppe>;
    servicegruppe: OrNothing<Kvalifiseringsgruppe>;
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

export interface Oppfolging {
    inaktivIArena: OrNothing<boolean>;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveres: OrNothing<boolean>;
    kanVarsles: boolean;
    manuell: boolean;
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
    tildeltVeilederId?: StringOrNothing;
    tildeltVeilederNavn?: StringOrNothing;
    enhet?: StringOrNothing;
}

export const useInnstillingsHistorikk = (fnr: string | undefined) => {
    const url = '/veilarboppfolging/api/v3/hent-instillingshistorikk';
    const { data, isLoading, error } = useSWR<InnstillingHistorikkInnslag[], ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
    return {
        innstillingsHistorikkData: data,
        innstillingsHistorikkLoading: isLoading,
        innstillingsHistorikkError: error
    };
};

export const useAvsluttOppfolgingStatus = (fnr: string | undefined) => {
    const url = `/veilarboppfolging/api/v3/oppfolging/hent-avslutning-status`;
    const { data, isLoading } = useSWR<AvslutningStatus>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
    return {
        avsluttOppfolgingStatus: data,
        avsluttOppfolgingStatusLoading: isLoading
    };
};

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

export const useTildelTilVeileder = () => {
    const url = '/veilarboppfolging/api/tilordneveileder';
    const { trigger, isMutating, error } = useSWRMutation(url, (url, arg: { arg: TildelVeilederData[] }) =>
        fetchWithPost(url, arg.arg)
    );
    return { tildelTilVeileder: trigger, isLoading: isMutating, error: error };
};

const graphqlQuery = `
    query hentOppfolgingsData($fnr: String!) {
        oppfolgingsEnhet(fnr: $fnr) {
            enhet {
                id
                navn
            }
        }
        brukerStatus(fnr: $fnr) {
            arena {
                inaktivIArena
                inaktiveringsdato
                kanReaktiveres
                formidlingsgruppe
                kvalifiseringsgruppe
            }
            manuell {
                erManuell
            }
            krr {
                kanVarsles
                reservertIKrr
                registrertIKrr
            }
            erKontorsperret
            veilederTilordning {
                veilederIdent
            }
        }
        oppfolging(fnr: $fnr) {
            erUnderOppfolging
        }
    }
`;

interface VeilederTilordning {
    veilederIdent: string;
}

interface ArenaStatus {
    inaktivIArena: boolean;
    inaktiveringsdato: StringOrNothing;
    kanReaktiveres: boolean | undefined;
    formidlingsgruppe: 'IARBS' | 'ARBS' | 'ISERV' | undefined;
    kvalifiseringsgruppe: Kvalifiseringsgruppe | undefined;
}

interface OppfolgingsDataGraphqlResponse {
    oppfolgingsEnhet: {
        enhet:
            | {
                  id: string;
                  navn: string;
              }
            | undefined;
    };
    brukerStatus: {
        arena: ArenaStatus | undefined;
        manuell: {
            erManuell: boolean | undefined;
        };
        krr: {
            kanVarsles: boolean;
            reservertIKrr: boolean;
            registrertIKrr: boolean;
        };
        erKontorsperret: boolean; // Tidligere kalt 'underKvp'
        veilederTilordning: VeilederTilordning | undefined;
    };
    oppfolging: {
        erUnderOppfolging: boolean | undefined;
    };
}

const mapTilBackoverkompatibelState = (
    data: GraphqlResponse<OppfolgingsDataGraphqlResponse>
): (Oppfolging & OppfolgingStatus) | undefined => {
    if ((data.errors?.length || 0) != 0) {
        throw new Error(
            `Feilet å hente oppfolgingsdata (graphql) fra veilarboppfolging: ${data.errors.map(it => it.message).join(',')}`
        );
    }
    if (!data.data) throw new Error(`Forventet "data" i graphql response med fikk ingenting`);
    return {
        inaktiveringsdato: data.data.brukerStatus.arena?.inaktiveringsdato,
        inaktivIArena: data.data.brukerStatus.arena?.inaktivIArena,
        kanReaktiveres: data.data.brukerStatus.arena?.kanReaktiveres,
        kanVarsles: data.data.brukerStatus.krr.kanVarsles,
        registrertKRR: data.data.brukerStatus.krr.registrertIKrr,
        reservasjonKRR: data.data.brukerStatus.krr.reservertIKrr,
        manuell: data.data.brukerStatus.manuell.erManuell || false,
        underKvp: data.data.brukerStatus.erKontorsperret,
        underOppfolging: data.data.oppfolging.erUnderOppfolging || false,
        veilederId: data.data.brukerStatus.veilederTilordning?.veilederIdent,
        oppfolgingsenhet: oppfolgingsEnhet(data.data.oppfolgingsEnhet.enhet),
        formidlingsgruppe: data.data.brukerStatus.arena?.formidlingsgruppe,
        servicegruppe: data.data.brukerStatus.arena?.kvalifiseringsgruppe
    };
};

export interface VeilarbOppfolgingGraphqlRequest {
    query: string;
    variables: { fnr: string };
}

const graphqlUrl = '/veilarboppfolging/api/graphql';
export const useVeilarboppfolgingData = (fnr: string | undefined) => {
    const { data, error, isLoading, mutate } = useSWR<(Oppfolging & OppfolgingStatus) | undefined, ErrorMessage>(
        fnr ? `${graphqlUrl}/${fnr}` : null,
        () =>
            fetchWithPost(graphqlUrl, {
                query: graphqlQuery,
                variables: { fnr: fnr as string }
            }).then(res => mapTilBackoverkompatibelState(res)),
        swrOptions
    );
    if (error) {
        // eslint-disable-next-line no-console
        console.log('useVeilarboppfolgingData - error', error);
    }
    return { oppfolging: data, isLoading, error, mutate };
};

/* Burde vært modelert annerledes men vil ikke brekke noe */
const oppfolgingsEnhet = (
    enhet: GraphqlResponse<OppfolgingsDataGraphqlResponse>['data']['oppfolgingsEnhet']['enhet'] | undefined
): OppfolgingEnhet => ({ enhetId: enhet?.id, navn: enhet?.navn });

export const useOppfolging = useVeilarboppfolgingData;
export const useOppfolgingsstatus = useVeilarboppfolgingData;

export function useTilgangTilBrukersKontor(fnr: string | undefined) {
    const url = '/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang';
    const { data, error, isLoading } = useSWR<TilgangTilBrukersKontor, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
    return { data, isLoading, error };
}
