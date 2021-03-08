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
    harVergemaal: boolean;
    harFullmakt: boolean;
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

export function fetchHarNivaa4(fnr: string): AxiosPromise<HarBruktNivaa4Type> {
    return axiosInstance.get<HarBruktNivaa4Type>(`/veilarbperson/api/person/${fnr}/harNivaa4`);
}
