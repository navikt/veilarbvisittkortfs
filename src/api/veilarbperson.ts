import { AxiosPromise } from 'axios';
import { axiosInstance, ErrorMessage, fetchWithPost, swrOptions } from './utils';
import { FrontendEvent } from '../util/logger';
import { StringOrNothing } from '../util/type/utility-types';
import useSWR from 'swr';

export interface Personalia {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
    fodselsnummer: string;
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

export interface PersonRequest {
    fnr: string;
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

export function fetchPersonalia(fnr: string, behandlingsnummer: string): AxiosPromise<Personalia> {
    return axiosInstance.post<Personalia>(`/veilarbperson/api/v3/hent-person`, {
        fnr: fnr,
        behandlingsnummer: behandlingsnummer
    } as PdlRequest);
}

export function fetchVerge(fnr: string, behandlingsnummer: string): AxiosPromise<Verge> {
    return axiosInstance.post<Verge>(`/veilarbperson/api/v3/person/hent-vergeOgFullmakt`, {
        fnr: fnr,
        behandlingsnummer: behandlingsnummer
    } as PdlRequest);
}

export function fetchFullmakt(fnr: string): AxiosPromise<FullmaktDTO> {
    return axiosInstance.post<FullmaktDTO>(`/veilarbperson/api/v3/person/hent-fullmakt`, {
        fnr: fnr
    } as PersonRequest);
}

export function fetchSpraakTolk(fnr: string, behandlingsnummer: string): AxiosPromise<SpraakTolk> {
    return axiosInstance.post<SpraakTolk>(`/veilarbperson/api/v3/person/hent-tolk`, {
        fnr: fnr,
        behandlingsnummer: behandlingsnummer
    } as PdlRequest);
}

//@TODO: 21/08/2023 denne skal slettes etter vi har ryddet opp i kode i de andre appene da dkif slutter å tilby tjenesten
export function fetchHarNivaa4(fnr: string): AxiosPromise<HarBruktNivaa4Type> {
    return axiosInstance.get<HarBruktNivaa4Type>(`/veilarbperson/api/person/${fnr}/harNivaa4`);
}

export function useOpplysningerOmArbeidssokerMedProfilering(fnr: string, hentData: boolean = true) {
    const url = '/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering';
    return useSWR<OpplysningerOmArbeidssoekerMedProfilering, ErrorMessage>(
        hentData ? url : null,
        () => fetchWithPost(url, { fnr }),
        swrOptions
    );
}

export function sendEventTilVeilarbperson(event: FrontendEvent): AxiosPromise<void> {
    return axiosInstance.post<void>(`/veilarbperson/api/logger/event`, event);
}
