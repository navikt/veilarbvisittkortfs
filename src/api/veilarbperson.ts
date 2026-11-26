import { fetchWithPost, HttpError, httpPost, swrOptions } from './httpUtils';
import { StringOrNothing } from '../util/type/utility-types';
import useSWR from 'swr';
import { behandlingsnummer } from './behandlingsnummer';
import { logGraphQLError } from './ao-oppfolgingskontor';
import { GraphqlResponse } from './GraphqlUtils';
import { KandidatForUtmeldingTag } from './veilarboppfolging';

export interface VisittkortEtiketter {
    dod: 'DOD' | 'UKJENT_PERSONALIA' | null;
    adressebeskyttelse: 'KODE_6' | 'KODE_7' | 'KODE_19' | 'UKJENT_PERSONALIA' | null;
    utmeldingskandidat: KandidatForUtmeldingTag | 'UKJENT_UTMELDINGSKANDIDAT' | null;
    sikkerhetstiltak: {
        etikett: 'SIKKERHETSTILTAK' | 'UKJENT_SIKKERHETSTILTAK';
        beskrivelse: string | null;
    } | null;
    skjerming: 'SKJERMET' | 'UKJENT_SKJERMING' | null;
    vergemaalOppfolging: 'VERGEMAAL_OPPFOLGING' | 'UKJENT_REPRESENTASJON' | null;
    fullmaktOppfolging: 'FULLMAKT_OPPFOLGING' | 'UKJENT_REPRESENTASJON' | null;
    tegnspraaktolk: 'TEGNSPRAAKTOLK' | 'UKJENT_TOLKEBEHOV' | null;
    talespraaktolk: 'TALESPRAAKTOLK' | 'UKJENT_TOLKEBEHOV' | null;
    kvp: 'KVP' | 'UKJENT_OPPFOLGING' | null;
    manuellOppfolging: 'MANUELL_OPPFOLGING' | 'UKJENT_OPPFOLGING' | null;
    reservertKrr: 'RESERVERT_KRR' | 'UKJENT_KRR' | null;
    utdatertIKrr: 'UTDATERT_I_KRR' | 'UKJENT_KRR' | null;
    ikkeUnderOppfolging: 'IKKE_UNDER_OPPFOLGING' | 'UKJENT_OPPFOLGING' | null;
    varsel: 'VARSEL' | 'UKJENT_VARSEL' | null;
    ikkeRegistrertKrr: 'IKKE_REGISTRERT_KRR' | 'UKJENT_KRR' | null;
    trengerOppfolgingsvedtak: 'TRENGER_OPPFOLGINGSVEDTAK' | 'UKJENT_OPPFOLGINGSVEDTAK' | null;
    sykmeldt: 'SYKMELDT' | 'UKJENT_OPPFOLGING' | null;
    iArbeidssokerregisteret: 'I_ARBEIDSSOKERREGISTERET' | 'UKJENT_ARBEIDSSOKERREGISTER' | null;
    antattGodeMuligheter: 'ANTATT_GODE_MULIGHETER' | 'UKJENT_PROFILERING' | null;
    antattBehovForVeiledning: 'ANTATT_BEHOV_FOR_VEILEDNING' | 'UKJENT_PROFILERING' | null;
    oppgittHindringer: 'OPPGITT_HINDRINGER' | 'UKJENT_PROFILERING' | null;
}

const visittkortEtiketterQuery = `
    query VisittkortEtiketter($fnr: ID!, $behandlingsnummer: String) {
        visittkortEtiketter(fnr: $fnr, behandlingsnummer: $behandlingsnummer) {
            dod
            adressebeskyttelse
            utmeldingskandidat
            sikkerhetstiltak { etikett beskrivelse }
            skjerming
            vergemaalOppfolging
            fullmaktOppfolging
            tegnspraaktolk
            talespraaktolk
            kvp
            manuellOppfolging
            reservertKrr
            utdatertIKrr
            ikkeUnderOppfolging
            varsel
            ikkeRegistrertKrr
            trengerOppfolgingsvedtak
            sykmeldt
            iArbeidssokerregisteret
            antattGodeMuligheter
            antattBehovForVeiledning
            oppgittHindringer
        }
    }
`;

interface VisittkortEtiketterResultat {
    etiketter: VisittkortEtiketter;
    feilendeEtiketter: (keyof VisittkortEtiketter)[];
}

function erEtikettfelt(
    felt: string | number | undefined,
    etiketter: VisittkortEtiketter
): felt is keyof VisittkortEtiketter {
    return typeof felt === 'string' && Object.hasOwn(etiketter, felt);
}

export const useVisittkortEtiketter = (fnr: string | undefined) =>
    useSWR<VisittkortEtiketterResultat, Error>(
        fnr ? ['/veilarbperson/graphql', 'visittkortEtiketter', fnr, behandlingsnummer] : null,
        async () => {
            const { data: response } = await httpPost<
                GraphqlResponse<{ visittkortEtiketter: VisittkortEtiketter | null }>
            >(
                '/veilarbperson/graphql',
                { query: visittkortEtiketterQuery, variables: { fnr, behandlingsnummer } },
                { withCredentials: true }
            );

            if (!response?.data?.visittkortEtiketter) {
                throw new Error('Kunne ikke laste etiketter');
            }

            const etiketter = { ...response.data.visittkortEtiketter };
            const feilendeEtiketter = new Set<keyof VisittkortEtiketter>();

            for (const felt in etiketter) {
                if (erEtikettfelt(felt, etiketter)) {
                    const verdi = etiketter[felt];
                    const kode = typeof verdi === 'object' ? verdi?.etikett : verdi;
                    if (kode?.startsWith('UKJENT_')) {
                        feilendeEtiketter.add(felt);
                        etiketter[felt] = null;
                    }
                }
            }

            for (const feil of response.errors ?? []) {
                const felt = feil.path?.[1];
                if (feil.path?.[0] !== 'visittkortEtiketter' || !erEtikettfelt(felt, etiketter)) {
                    throw new Error('Kunne ikke laste etiketter');
                }

                feilendeEtiketter.add(felt);
                etiketter[felt] = null;
            }

            if (feilendeEtiketter.size === Object.keys(etiketter).length) {
                throw new Error('Kunne ikke laste etiketter');
            }

            return { etiketter, feilendeEtiketter: [...feilendeEtiketter] };
        },
        swrOptions
    );

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

export const usePersonalia = (fnr: string | undefined) => {
    const { data, error, isLoading } = useSWR(
        fnr ? `/veilarbperson/graphql/${fnr}` : null,
        () => hentPersonalia(fnr as string, behandlingsnummer),
        swrOptions
    );
    return { personalia: data?.data?.person, error, isLoading };
};

export const useVerge = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-vergeOgFullmakt';
    const { data, error, isLoading } = useSWR<Verge, HttpError>(
        fnr && behandlingsnummer ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { verge: data, error, isLoading };
};

export const useFullmakt = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-fullmakt';
    const { data, error, isLoading } = useSWR<FullmaktDTO, HttpError>(
        fnr && behandlingsnummer ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { fullmakt: data, error, isLoading };
};

export const useSpraakTolk = (fnr: string | undefined) => {
    const url = '/veilarbperson/api/v3/person/hent-tolk';
    const { data, error, isLoading } = useSWR<SpraakTolk, HttpError>(
        fnr && behandlingsnummer ? `${url}/${fnr}/${behandlingsnummer}` : null,
        () => fetchWithPost(url, { fnr: fnr as string, behandlingsnummer } as PdlRequest),
        swrOptions
    );
    return { spraakTolk: data, error, isLoading };
};

export function useOpplysningerOmArbeidssokerMedProfilering(fnr: string | undefined) {
    const url = '/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering';
    return useSWR<OpplysningerOmArbeidssoekerMedProfilering, HttpError>(
        fnr ? `${url}/${fnr}` : null,
        () => fetchWithPost(url, { fnr: fnr as string }),
        swrOptions
    );
}

export function sendEventTilVeilarbperson() {
    // Dette endepunktet er kommentert ut i veilarbperson, sannsynligvis fordi influx er var vanskelig å sette opp for gcp
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

async function hentPersonalia(
    fnr: string,
    behandlingsnummer: string
): Promise<GraphqlResponse<{ person: Personalia }>> {
    const requestBody: PersonaliaGraphqlRequest = {
        query: graphqlQuery,
        variables: { fnr, behandlingsnummer }
    };
    const res = await fetchWithPost('/veilarbperson/graphql', requestBody);
    if (res.errors) {
        logGraphQLError(res);
        throw new Error('Feil ved henting av personalia');
    }
    return res;
}
