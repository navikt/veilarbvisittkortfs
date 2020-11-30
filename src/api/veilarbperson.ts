import { Options } from 'axios-hooks';
import { useAxios, UseAxiosResponseValue } from './utils';
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

export interface HarBruktNivaa4Type {
    harbruktnivaa4: boolean;
    personidentifikator?: string;
}

export function useFetchPersonalia(fnr: string, options?: Options): UseAxiosResponseValue<Personalia> {
    return useAxios<Personalia>({ url: `/veilarbperson/api/person/${fnr}` }, options);
}

export function useFetchHarNivaa4(fnr: string, options?: Options): UseAxiosResponseValue<HarBruktNivaa4Type> {
    return useAxios<HarBruktNivaa4Type>({ url: `/veilarbperson/api/person/${fnr}/harNivaa4` }, options);
}
