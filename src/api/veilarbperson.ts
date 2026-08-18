import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { FrontendEvent } from '../util/logger';
import { StringOrNothing } from '../util/type/utility-types';
import useSWR from 'swr';
import { behandlingsnummer } from './behandlingsnummer';
import { logGraphQLError } from './ao-oppfolgingskontor';
import { GraphqlResponse } from './GraphqlUtils';
import { MINIMERT_PDL_DATA, useFeaturesFromOboUnleash } from './veilarbpersonflatefs';

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

export interface PersonaliaGraphqlRequest {
    query: string;
    variables: { fnr: string; behandlingsnummer: string };
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

// Intern hook for REST-endepunktet — brukes kun av usePersonalia-wrapperen nedenfor.
const usePersonaliaRest = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/hent-person';
    const { data, error, isLoading } = useSWR<Personalia, ErrorMessage>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { personalia: data, error, isLoading };
};

// Intern hook for GraphQL-endepunktet — brukes kun av usePersonalia-wrapperen nedenfor.
const usePersonaliaGraphql = (fnr: string | undefined) => {
    const { data, error, isLoading } = useSWR(
        fnr ? `/veilarbperson/graphql/${fnr}` : null,
        () => hentPersonalia(fnr as string, behandlingsnummer),
        swrOptions
    );
    return { personalia: data?.data?.person, error, isLoading };
};

// TODO: Fjern toggle når veilarbvisittkortfs.minimert_pdldata er verifisert (ca. én måned).
// Ved fjerning:
//   1. Slett usePersonaliaRest og usePersonaliaGraphql
//   2. Gjør usePersonalia om til å kalle GraphQL direkte (inline hentPersonalia-logikken)
//   3. Fjern MINIMERT_PDL_DATA fra veilarbpersonflatefs.ts (konstant, ALL_TOGGLES, OboUnleashFeatures)
//   4. Fjern MINIMERT_PDL_DATA fra mock/api/veilarbpersonflatefs.ts
//   5. Valgfritt: fjern mock-handler for POST /veilarbperson/api/v3/hent-person
export const usePersonalia = (fnr: string | undefined) => {
    const { features } = useFeaturesFromOboUnleash();
    const brukGraphQL = features?.[MINIMERT_PDL_DATA] ?? false;
    const restResult = usePersonaliaRest(brukGraphQL ? undefined : fnr);
    const graphqlResult = usePersonaliaGraphql(brukGraphQL ? fnr : undefined);
    // Manuell verifisering nødvendig når toggle aktiveres:
    // Sjekk at disse valgfrie feltene vises korrekt i UI: mellomnavn, dodsdato,
    // diskresjonskode, sikkerhetstiltak og telefon-liste.
    // REST-responsen er allerede verifisert; GraphQL-skjemaet kan ha ulik null-håndtering.
    return brukGraphQL ? graphqlResult : restResult;
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

function hentPersonalia(fnr: string, behandlingsnummer: string): Promise<GraphqlResponse<{ person: Personalia }>> {
    const requestBody: PersonaliaGraphqlRequest = {
        query: graphqlQuery,
        variables: { fnr, behandlingsnummer }
    };
    return fetchWithPost('/veilarbperson/graphql', requestBody).then((res: GraphqlResponse<{ person: Personalia }>) => {
        if (res.errors) {
            logGraphQLError(res);
            throw new Error('Feil ved henting av personalia');
        }
        return res;
    });
}
