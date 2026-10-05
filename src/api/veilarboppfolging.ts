import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { ErrorMessage, fetchWithPost, httpPost, HttpPromise, swrOptions } from './httpUtils';
import { OrNothing, StringOrNothing } from '../util/type/utility-types';
import { GraphqlResponse } from './GraphqlUtils';

interface OppfolgingEnhet {
    navn: StringOrNothing;
    enhetId: StringOrNothing;
}

export interface OppfolgingStatus {
    oppfolgingsenhet: OppfolgingEnhet;
    veilederId: StringOrNothing;
}

export interface AvslutningStatus {
    inaktiveringsDato: StringOrNothing;
    kanAvslutte: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    erIserv: boolean;
    harAktiveTiltaksdeltakelser: boolean;
    erDeltakerIUngdomsprogrammet: boolean;
    erArbeidssoeker: boolean;
    harAap: boolean;
}

export interface Oppfolging {
    kanVarsles: boolean;
    manuell: boolean;
    reservasjonKRR: boolean;
    registrertKRR: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
    veilederId: StringOrNothing;
    harVeilederLeseTilgangTilBruker: boolean;
    harVeilederLeseTilgangTilBrukersEnhet: boolean;
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

export interface ForlengOppfolgingRequest {
    fnr: string;
    forlengetTil: string;
}

export type ForlengOppfolgingResponse = {
    ok: boolean;
};

export type KandidatForUtmeldingHendelseUtfortAvType = 'VEILEDER' | 'SYSTEM' | 'BRUKER' | 'UKJENT';

export type UtmeldingskandidatHistorikkType =
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_IKKE_LEVERT_MELDEKORT'
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE'
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_ANNET'
    | 'FORLENGELSE_OPPRETTET'
    | 'FORLENGELSE_ENDRET'
    | 'FORLENGELSE_UTLOPT';

export type InnstillingsHistorikkType =
    | 'SATT_TIL_DIGITAL'
    | 'SATT_TIL_MANUELL'
    | 'STARTET_OPPFOLGINGSPERIODE'
    | 'AVSLUTTET_OPPFOLGINGSPERIODE'
    | 'REAKTIVERT_OPPFOLGINGSPERIODE'
    | 'KVP_STARTET'
    | 'KVP_STOPPET'
    | 'VEILEDER_TILORDNET'
    | 'OPPFOLGINGSENHET_ENDRET'
    | UtmeldingskandidatHistorikkType;

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

export function settBrukerTilDigital(fnr: string, veilederId: string, begrunnelse: string): HttpPromise {
    return httpPost(`/veilarboppfolging/api/v3/oppfolging/settDigital`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function settBrukerTilManuell(fnr: string, veilederId: string, begrunnelse: string): HttpPromise {
    return httpPost(`/veilarboppfolging/api/v3/oppfolging/settManuell`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function startKvpOppfolging(fnr: string, begrunnelse: string): HttpPromise {
    return httpPost(`/veilarboppfolging/api/v3/oppfolging/startKvp`, {
        fnr,
        begrunnelse
    });
}

export function stoppKvpOppfolging(fnr: string, begrunnelse: string): HttpPromise {
    return httpPost(`/veilarboppfolging/api/v3/oppfolging/stoppKvp`, {
        fnr,
        begrunnelse
    });
}

export function avsluttOppfolging(fnr: string, begrunnelse: string, veilederId: string): HttpPromise<AvslutningStatus> {
    return httpPost(`/veilarboppfolging/api/v2/oppfolging/avslutt`, {
        fnr,
        begrunnelse,
        veilederId
    });
}

export function useForlengOppfolging() {
    const url = '/veilarboppfolging/api/forlengelse';
    const { trigger, isMutating, error } = useSWRMutation<
        ForlengOppfolgingResponse,
        ErrorMessage,
        string,
        ForlengOppfolgingRequest
    >(url, (url, { arg }) => fetchWithPost(url, arg));
    return {
        forlengOppfolging: trigger,
        isLoading: isMutating,
        error: error
    };
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
        veilederTilgang(fnr: $fnr) {
            harVeilederLeseTilgangTilBruker
            harVeilederLeseTilgangTilBrukersEnhet
        }
        oppfolgingsEnhet(fnr: $fnr) {
            enhet {
                id
                navn
            }
        }
        brukerStatus(fnr: $fnr) {
            sykmeldtStatus
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
        utmeldingskandidat(fnr: $fnr) {
            aktivForlengelse {
                utfortAvType
                utfortAv
                hendelseTidspunkt
                forlengetTil
            }
            utmeldingskandidatHendelser {
                utfortAvType
                utfortAv
                hendelseTidspunkt
                type
                forlengetTil
            }
            tag
        }
    }
`;

interface VeilederTilordning {
    veilederIdent: string;
}

interface Enhet {
    id: string;
    navn: string;
}

export type KandidatForUtmeldingTag =
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_IKKE_LEVERT_MELDEKORT'
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_SVARTE_NEI_I_BEKREFTELSE'
    | 'ARBEIDSSOKERPERIODE_AVSLUTTET_ANNET'
    | 'FORLENGELSE_UTLOPT';

export interface MedUtmeldingskandidat {
    utmeldingskandidat: {
        aktivForlengelse: {
            utfortAvType: KandidatForUtmeldingHendelseUtfortAvType;
            utfortAv: string | undefined;
            hendelseTidspunkt: string;
            forlengetTil: string | undefined;
        } | null;
        utmeldingskandidatHendelser: {
            utfortAvType: KandidatForUtmeldingHendelseUtfortAvType;
            utfortAv: string | undefined;
            hendelseTidspunkt: string;
            type: UtmeldingskandidatHistorikkType | undefined;
            forlengetTil: string | undefined;
        }[];
        tag: KandidatForUtmeldingTag | null;
    };
}

export type SykmeldtStatus = 'SYKMELDT_MED_ARBEIDSGIVER' | 'SYKMELDT_UTEN_ARBEIDSGIVER';

export interface OppfolgingsDataGraphqlResponse {
    veilederTilgang: {
        harVeilederLeseTilgangTilBruker: boolean;
        harVeilederLeseTilgangTilBrukersEnhet: boolean;
    };
    oppfolgingsEnhet:
        | {
              enhet: Enhet | undefined;
          }
        | undefined;
    brukerStatus: {
        sykmeldtStatus: SykmeldtStatus | null;
        manuell:
            | {
                  erManuell: boolean | undefined;
              }
            | undefined;
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
    utmeldingskandidat: MedUtmeldingskandidat['utmeldingskandidat'];
}

const mapTilBackoverkompatibelState = (
    data: GraphqlResponse<OppfolgingsDataGraphqlResponse>
): (Oppfolging & OppfolgingStatus & MedUtmeldingskandidat & { sykmeldtStatus: SykmeldtStatus | null }) | undefined => {
    if ((data.errors?.length || 0) != 0) {
        throw new Error(
            `Feilet å hente oppfolgingsdata (graphql) fra veilarboppfolging: ${data.errors.map(it => it.message).join(',')}`
        );
    }
    if (!data.data) throw new Error(`Forventet "data" i graphql response men fikk ingenting`);
    return {
        harVeilederLeseTilgangTilBruker: data.data.veilederTilgang.harVeilederLeseTilgangTilBruker,
        harVeilederLeseTilgangTilBrukersEnhet: data.data.veilederTilgang.harVeilederLeseTilgangTilBrukersEnhet,
        kanVarsles: data.data.brukerStatus.krr.kanVarsles,
        registrertKRR: data.data.brukerStatus.krr.registrertIKrr,
        reservasjonKRR: data.data.brukerStatus.krr.reservertIKrr,
        manuell: data.data.brukerStatus.manuell?.erManuell || false,
        underKvp: data.data.brukerStatus.erKontorsperret,
        underOppfolging: data.data.oppfolging.erUnderOppfolging || false,
        veilederId: data.data.brukerStatus.veilederTilordning?.veilederIdent,
        oppfolgingsenhet: oppfolgingsEnhet(data.data.oppfolgingsEnhet?.enhet),
        utmeldingskandidat: data.data.utmeldingskandidat,
        sykmeldtStatus: data.data.brukerStatus.sykmeldtStatus
    };
};

export interface VeilarbOppfolgingGraphqlRequest {
    query: string;
    variables: { fnr: string };
}

const graphqlUrl = '/veilarboppfolging/api/graphql';
export const useVeilarboppfolgingData = (fnr: string | undefined) => {
    const { data, error, isLoading, mutate } = useSWR<
        (Oppfolging & OppfolgingStatus & MedUtmeldingskandidat & { sykmeldtStatus: SykmeldtStatus | null }) | undefined,
        Error
    >(
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
        console.error('useVeilarboppfolgingData - error', error);
    }
    return { oppfolging: data, isLoading, error, mutate };
};

/* Burde vært modellert annerledes men vil ikke brekke noe */
const oppfolgingsEnhet = (enhet: Enhet | undefined): OppfolgingEnhet => ({ enhetId: enhet?.id, navn: enhet?.navn });

export const useOppfolging = useVeilarboppfolgingData;
export const useOppfolgingsstatus = useVeilarboppfolgingData;

const aktiveTiltaksdeltakelserGraphqlQuery = `
  query($fnr: String!) {
    brukerStatus(fnr: $fnr) {
		harAktiveTiltaksdeltakelser
    }
  }
`;

export interface BrukerStatusResponse {
    brukerStatus?: BrukerStatus;
}

export interface BrukerStatus {
    harAktiveTiltaksdeltakelser?: boolean;
}

export function useBrukerHarAktiveTiltaksdeltakelser(fnr: string) {
    const url = '/veilarboppfolging/api/graphql';
    const { data, error, isLoading } = useSWR<GraphqlResponse<BrukerStatusResponse>, ErrorMessage>(
        fnr ? `brukerHarAktiveTiltaksdeltakelser/${fnr}` : null,
        () =>
            fetchWithPost(url, {
                query: aktiveTiltaksdeltakelserGraphqlQuery,
                variables: { fnr }
            }),
        swrOptions
    );
    return { data, isLoading, error };
}
