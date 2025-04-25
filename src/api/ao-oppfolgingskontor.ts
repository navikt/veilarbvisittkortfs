import { axiosInstance, axiosJsonRequestConfig } from './utils';
import { GraphqlResponse } from './GraphqlUtils';

export interface ArbeidsOppfolgingKontorDTO {
    kontorId: string;
    fnr: string;
}

export interface Kontor {
    kontorId: string;
    navn: string;
}

const graphqlQuery = `
    { alleKontor { kontorId , navn } }
`;

export function hentAlleKontor() {
    return axiosInstance.post<GraphqlResponse<{ alleKontor: Kontor[] }>>(
        `/ao-oppfolgingskontor/graphql`,
        JSON.stringify({
            query: graphqlQuery
        }),
        axiosJsonRequestConfig
    );
}

export function settKontor(arbeidsOppfolgingKontorDTO: ArbeidsOppfolgingKontorDTO) {
    return axiosInstance.post<string>(
        `/ao-oppfolgingskontor/api/kontor`,
        arbeidsOppfolgingKontorDTO,
        axiosJsonRequestConfig
    );
}
