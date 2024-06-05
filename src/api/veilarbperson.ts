import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { FrontendEvent } from '../util/logger';
import { StringOrNothing } from '../util/type/utility-types';

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

export type RegistreringType = 'ORDINAER' | 'SYKMELDT';
export type InnsatsgruppeType = 'STANDARD_INNSATS' | 'SITUASJONSBESTEMT_INNSATS' | 'BEHOV_FOR_ARBEIDSEVNEVURDERING';

export interface RegistreringData {
    type: RegistreringType;
    registrering: {
        profilering?: {
            jobbetSammenhengendeSeksAvTolvSisteManeder: boolean;
            innsatsgruppe: InnsatsgruppeType;
        };
        manueltRegistrertAv: object | null;
    };
}

export type OpplysningerOmArbeidssoker = {
    opplysningerOmArbeidssoekerId: string;
    periodeId: string;
    sendtInnAv: {
        tidspunkt: string;
        utfoertAv: {
            type: string;
            id: string;
        };
        kilde: string;
        aarsak: string;
    };
    utdanning: {
        nus: string;
        bestaatt: string;
        godkjent: string;
    };
    helse: {
        helsetilstandHindrerArbeid: string;
    };
    annet: {
        andreForholdHindrerArbeid: string;
    };
    jobbsituasjon: Jobbsituasjon[];
};

type Jobbsituasjon = {
    beskrivelse: string;
    detaljer: {
        gjelder_fra_dato_iso8601?: string;
        gjelder_til_dato_iso8601?: string;
        stilling?: string;
        stilling_styrk08?: string;
        prosent?: string;
        siste_dag_med_loenn_iso8601?: string;
        siste_arbeidsdag_iso8601?: string;
    };
};

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
    opplysningerOmArbeidssoeker?: OpplysningerOmArbeidssoker;
    profilering: Profilering;
}

export function fetchPersonalia(fnr: string, behandlingsnummer: string): AxiosPromise<Personalia> {
    return axiosInstance.post<Personalia>(`/veilarbperson/api/v3/hent-person`, {
        fnr: fnr,
        behandlingsnummer: behandlingsnummer
    } as PdlRequest);
}

export function fetchVergeOgFullmakt(fnr: string, behandlingsnummer: string): AxiosPromise<VergeOgFullmakt> {
    return axiosInstance.post<VergeOgFullmakt>(`/veilarbperson/api/v3/person/hent-vergeOgFullmakt`, {
        fnr: fnr,
        behandlingsnummer: behandlingsnummer
    } as PdlRequest);
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

export function fetchRegistrering(fnr: string): AxiosPromise<RegistreringData> {
    return axiosInstance.post<RegistreringData>(`/veilarbperson/api/v3/person/hent-registrering`, {
        fnr: fnr
    } as PersonRequest);
}

export function fetchOpplysningerOmArbeidssoekerMedProfilering(
    fnr: string
): AxiosPromise<OpplysningerOmArbeidssoekerMedProfilering> {
    return axiosInstance.post<OpplysningerOmArbeidssoekerMedProfilering>(
        `/veilarbperson/api/v3/person/hent-siste-opplysninger-om-arbeidssoeker-med-profilering`,
        {
            fnr: fnr
        } as PersonRequest
    );
}

export function sendEventTilVeilarbperson(event: FrontendEvent): AxiosPromise<void> {
    return axiosInstance.post<void>(`/veilarbperson/api/logger/event`, event);
}
