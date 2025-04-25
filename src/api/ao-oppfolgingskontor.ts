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
    return axiosInstance
        .post<GraphqlResponse<{ alleKontor: Kontor[] }>>(
            `/ao-oppfolgingskontor/graphql`,
            JSON.stringify({
                query: graphqlQuery
            }),
            axiosJsonRequestConfig
        )
        .then(res => {
            if (res.data.errors) {
                logGraphQLError(res.data);
                throw new Error('Feil ved henting av kontor');
            }
            return res;
        });
}

export function settKontor(arbeidsOppfolgingKontorDTO: ArbeidsOppfolgingKontorDTO) {
    return axiosInstance.post<string>(
        `/ao-oppfolgingskontor/api/kontor`,
        arbeidsOppfolgingKontorDTO,
        axiosJsonRequestConfig
    );
}

interface GraphqlError {
    message: string;
    locations?: { line: number; column: number }[];
    path?: (string | number)[];
    extensions?: { [key: string]: unknown };
}

/* eslint no-console: 0 */
export function logGraphQLError(response: { errors: GraphqlError[] }): void {
    if (!response || !Array.isArray(response.errors)) {
        console.warn('Invalid or empty GraphQL error object.');
        return;
    }

    console.groupCollapsed(
        `%cGraphQL Error: ${response.errors[0]?.message}`,
        'color: red; font-weight: bold; font-size: 13px;'
    );

    response.errors.forEach((err, idx) => {
        const prefix = `[Error ${idx + 1}]`;

        console.error(`${prefix} ${err.message}`);

        if (err.path) {
            console.log(`    at path: ${err.path.join('.')}`);
        }

        if (err.locations) {
            err.locations.forEach(loc => {
                console.log(`    at line ${loc.line}, column ${loc.column}`);
            });
        }

        if (err.extensions) {
            console.log('    extensions:', err.extensions);
        }

        console.log('');
    });

    console.groupEnd();
}
