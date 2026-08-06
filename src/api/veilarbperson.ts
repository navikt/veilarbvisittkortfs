import { AxiosPromise } from 'axios';
import { axiosInstance, axiosJsonRequestConfig, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { FrontendEvent } from '../util/logger';
import { StringOrNothing } from '../util/type/utility-types';
import useSWR from 'swr';
import { behandlingsnummer } from './behandlingsnummer';
import { logGraphQLError } from './ao-oppfolgingskontor';
import { GraphqlResponse } from './GraphqlUtils';

export interface Personalia {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
    fodselsdato: string;
    dodsdato: StringOrNothing;
    kjonn: string;
    diskresjonskode: StringOrNothing;
    egenAnsatt: boolean;
    sikkerhetstiltak: StringOrNothing;
    telefon: PersonaliaTelefon[];
}

export interface VergeNavn {
    fornavn: StringOrNothing;
    mellomnavn: StringOrNothing;
    etternavn: StringOrNothing;
}

export interface VergeEllerFullmektig {
    navn: VergeNavn;
    motpartsPersonident: StringOrNothing;
    omfang: StringOrNothing;
}

export interface Folkeregistermetadata {
    ajourholdstidspunkt: StringOrNothing;
    gyldighetstidspunkt: StringOrNothing;
}

export interface VergemaalEllerFremtidsfullmakt {
    type: StringOrNothing;
    embete: StringOrNothing;
    vergeEllerFullmektig: VergeEllerFullmektig;
    folkeregistermetadata: Folkeregistermetadata;
}

export interface Verge {
    vergemaalEllerFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[];
}

export interface FullmaktDTO {
    fullmakt: FullmaktData[];
}

export interface FullmaktData {
    fullmaktsgiver: StringOrNothing;
    fullmektig: StringOrNothing;
    omraade: OmraadeMedHandling[];
    gyldigFraOgMed: StringOrNothing;
    gyldigTilOgMed: StringOrNothing;
    fullmaktsgiverNavn: StringOrNothing;
    fullmektigsNavn: StringOrNothing;
}

export interface OmraadeMedHandling {
    tema: StringOrNothing;
    handling: OmraadeHandlingType[];
}

export enum OmraadeHandlingType {
    LES = 'LES',
    KOMMUNISER = 'KOMMUNISER',
    SKRIV = 'SKRIV'
}

export interface SpraakTolk {
    tegnspraak: StringOrNothing;
    talespraak: StringOrNothing;
}

export interface HarBruktNivaa4Type {
    harbruktnivaa4: boolean;
    personidentifikator?: string;
}

export interface PersonaliaTelefon {
    prioritet: string;
    telefonNr: string;
    registrertDato: StringOrNothing;
    master: StringOrNothing;
}

export interface PdlRequest {
    fnr: string;
    behandlingsnummer: string;
}

export type Profilering = {
    profileringId: string;
    periodeId: string;
    opplysningerOmArbeidssoekerId: string;
    sendtInnAv: {
        tidspunkt: string;
        utfoertAv: {
            type: string;
        };
        kilde: string;
        aarsak: string;
    };
    profilertTil: string;
    jobbetSammenhengendeSeksAvTolvSisteManeder: boolean;
    alder: number;
};
export interface OpplysningerOmArbeidssoekerMedProfilering {
    arbeidssoekerperiodeStartet: string;
    profilering: Profilering;
}

export const usePersonalia = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/hent-person';
    const { data, error, isLoading } = useSWR<Personalia, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { personalia: data, error, isLoading };
};
export const usePersonaliaGraphql = (fnr: string | undefined) => {
    const { data, error, isLoading } = useSWR(
        fnr ? `/veilarbperson/graphql/${fnr}` : null,
        () => hentPersonalia(fnr as string, behandlingsnummer),
        swrOptions
    );
    return { personalia: data?.data?.data, error, isLoading };
};

export const useVerge = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-vergeOgFullmakt';
    const { data, error, isLoading } = useSWR<Verge, ErrorMessage>(
        fnr && behandlingsnummer ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { verge: data, error, isLoading };
};

export const useFullmakt = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-fullmakt';
    const { data, error, isLoading } = useSWR<FullmaktDTO, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
    return { fullmakt: data, error, isLoading };
};

export const useSpraakTolk = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-tolk';
    const { data, error, isLoading } = useSWR<SpraakTolk, ErrorMessage>(
        fnr && behandlingsnummer ? `${url}/${fnr}/${behandlingsnummer}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { spraakTolk: data, error, isLoading };
};

export function useOpplysningerOmArbeidssokerMedProfilering(fnr: string | undefined) {
    const url = '/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering';
    return useSWR<OpplysningerOmArbeidssoekerMedProfilering, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
}

export function sendEventTilVeilarbperson(event: FrontendEvent): AxiosPromise<void> {
    return axiosInstance.post<void>(`/veilarbperson/api/logger/event`, event);
}


const graphqlQuery = `
    query($fnr: ID!, $behandlingsnummer: String!) {
        person(fnr: $fnr, behandlingsnummer: $behandlingsnummer) {
           fornavn
           mellomnavn
           etternavn
           fodselsdato
           dodsdato
           kjonn
           diskresjonskode
           egenAnsatt
           sikkerhetstiltak
           telefon { prioritet telefonNr registrertDato master }
            }
        }
    `;

function hentPersonalia(fnr: string, behandlingsnummer: string ) {
    return axiosInstance
        .post<
        GraphqlResponse<{
        fornavn: string;
        etternavn: string;
        diskresjonskode: StringOrNothing;
        egenAnsatt: boolean;
        telefon: PersonaliaTelefon;
        }>
    >(
        `/veilarbperson/graphql`,
            {
                query: graphqlQuery,
                variables: { fnr, behandlingsnummer }
            },
            axiosJsonRequestConfig
        )
        .then(res => {
            if (res.data.errors) {
                logGraphQLError(res.data);
                throw new Error('Feil ved henting av personalia');
            }
            return res;
        });
}
