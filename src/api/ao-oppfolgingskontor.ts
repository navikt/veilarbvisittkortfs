import { axiosInstance } from './utils';
import { GraphqlResponse } from './GraphqlUtils';

export interface ArbeidsOppfolgingKontorDTO {
    kontorId: string;
    fnr: string;
}

export interface Kontor {
    kontorId: string;
    navn: string;
}

export function hentAlleKontor() {
    return axiosInstance.post<GraphqlResponse<{alleKontor: Kontor[]}>>(`/ao-oppfolgingskontor/graphql`);
}

export function settKontor(arbeidsOppfolgingKontorDTO: ArbeidsOppfolgingKontorDTO) {
    return axiosInstance.post<string>(`/ao-oppfolgingskontor/api/kontor`, arbeidsOppfolgingKontorDTO);
}
