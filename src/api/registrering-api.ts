import { fetchToJson } from './api-utils';

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

export function fetchRegistreringData(fnr: string) {
    return fetchToJson<RegistreringData>(`/veilarbregistrering/api/registrering/?fnr=${fnr}`);
}
