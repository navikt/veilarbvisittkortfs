import { fetchToJson } from './api-utils';

export type RegistreringType = 'ORDINAER' | 'SYKMELDT';

export interface RegistreringData {
    type: RegistreringType;
    registrering: {
        manueltRegistrertAv: {} | null
    };
}

export function fetchRegistreringData(fnr: string) {
    return fetchToJson<RegistreringData>(`/veilarbregistrering/api/registrering/?fnr=${fnr}`);
}
