import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { StringOrNothing } from '../util/type/stringornothings';

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

export interface Fullmakt {
    motpartsPersonident: StringOrNothing;
    motpartsRolle: StringOrNothing;
    omraader: string[];
    gyldigFraOgMed: StringOrNothing;
    gyldigTilOgMed: StringOrNothing;
}

export interface VergeOgFullmakt {
    vergemaalEllerFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[];
    fullmakt: Fullmakt[];
}

export interface SpraakTolk {
    tegnspraak: StringOrNothing;
    talespraak: StringOrNothing;
}

export interface HarBruktNivaa4Type {
    harbruktnivaa4: boolean;
    personidentifikator?: string;
}

export type RegistreringType = 'ORDINAER' | 'SYKMELDT';
export type InnsatsgruppeType = 'STANDARD_INNSATS' | 'SITUASJONSBESTEMT_INNSATS' | 'BEHOV_FOR_ARBEIDSEVNEVURDERING';

export interface RegistreringData {
    type: RegistreringType;
    registrering: {
        profilering?: {
            jobbetSammenhengendeSeksAvTolvSisteManeder: boolean;
            innsatsgruppe: InnsatsgruppeType;
        };
        manueltRegistrertAv: {} | null;
    };
}

export function fetchPersonalia(fnr: string, hentPersonDataFraPdl: boolean): AxiosPromise<Personalia> {
    if (hentPersonDataFraPdl) {
        return axiosInstance.get<Personalia>(`/veilarbperson/api/v2/person?fnr=${fnr}`);
    } else {
        return axiosInstance.get<Personalia>(`/veilarbperson/api/person/${fnr}`);
    }
}

export function fetchVergeOgFullmakt(fnr: string): AxiosPromise<VergeOgFullmakt> {
    return axiosInstance.get<VergeOgFullmakt>(`/veilarbperson/api/v2/person/vergeOgFullmakt?fnr=${fnr}`);
}

export function fetchSpraakTolk(fnr: string): AxiosPromise<SpraakTolk> {
    return axiosInstance.get<SpraakTolk>(`/veilarbperson/api/v2/person/tolk?fnr=${fnr}`);
}

export function fetchHarNivaa4(fnr: string): AxiosPromise<HarBruktNivaa4Type> {
    return axiosInstance.get<HarBruktNivaa4Type>(`/veilarbperson/api/person/${fnr}/harNivaa4`);
}

export function fetchRegistrering(fnr: string): AxiosPromise<RegistreringData> {
    return axiosInstance.get<RegistreringData>(`/veilarbperson/api/person/registrering?fnr=${fnr}`);
}
