import { Options } from 'axios-hooks';
import { useAxios, UseAxiosResponseValue } from './utils';

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

export function useFetchRegistrering(fnr: string, options?: Options): UseAxiosResponseValue<RegistreringData> {
    return useAxios<RegistreringData>({ url: `/veilarbregistrering/api/registrering?fnr=${fnr}` }, options);
}
