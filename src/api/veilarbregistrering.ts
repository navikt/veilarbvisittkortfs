import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

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

export function fetchRegistrering(fnr: string): AxiosPromise<RegistreringData> {
    return axiosInstance.get<RegistreringData>(`/veilarbregistrering/api/registrering?fnr=${fnr}`);
}
