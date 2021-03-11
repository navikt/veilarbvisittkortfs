import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { StringOrNothing } from '../util/type/stringornothings';

export interface Personalia {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
    sammensattNavn: string;
    fodselsnummer: string;
    fodselsdato: string;
    dodsdato: StringOrNothing;
    kjonn: string;
    diskresjonskode: StringOrNothing;
    egenAnsatt: boolean;
    sikkerhetstiltak: StringOrNothing;
}

export interface PersonaliaV2 {
    fornavn: string;
    mellomnavn: StringOrNothing;
    etternavn: string;
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

export interface Fullmakter {
    motpartsPersonident: StringOrNothing;
    motpartsRolle: StringOrNothing;
    omraader: string[];
    gyldigFraOgMed: StringOrNothing;
    gyldigTilOgMed: StringOrNothing;
}

export interface VergeOgFullmakt {
    vergeEllerFremtidsfullmakt: VergemaalEllerFremtidsfullmakt[];
    fullmakt: Fullmakter[];
}

export interface HarBruktNivaa4Type {
    harbruktnivaa4: boolean;
    personidentifikator?: string;
}

export function fetchPersonalia(fnr: string): AxiosPromise<Personalia> {
    return axiosInstance.get<Personalia>(`/veilarbperson/api/person/${fnr}`);
}

export function fetchPersonaliaV2(fnr: string): AxiosPromise<PersonaliaV2> {
    return axiosInstance.get<PersonaliaV2>(`/veilarbperson/api/v2/person/${fnr}`);
}

export function fetchVergeOgFullmakt(fnr: string): AxiosPromise<VergeOgFullmakt> {
    return axiosInstance.get<VergeOgFullmakt>(`/veilarbperson/api/v2/person/vergeOgFullmakt/${fnr}`);
}

export function fetchHarNivaa4(fnr: string): AxiosPromise<HarBruktNivaa4Type> {
    return axiosInstance.get<HarBruktNivaa4Type>(`/veilarbperson/api/person/${fnr}/harNivaa4`);
}
