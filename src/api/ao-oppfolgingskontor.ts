import { axiosInstance } from './utils';

export interface ArbeidsOppfolgingKontorDTO {
    kontorId: string;
    fnr: string;
}

export function settKontor(arbeidsOppfolgingKontorDTO: ArbeidsOppfolgingKontorDTO) {
    return axiosInstance.post<string>(`/api/kontor`, { arbeidsOppfolgingKontorDTO });
}
