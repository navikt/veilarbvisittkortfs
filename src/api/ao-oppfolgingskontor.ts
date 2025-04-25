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

function logGraphQLError(response: { errors: GraphqlError[] }): void {
    if (!response || !Array.isArray(response.errors)) {
        // eslint-disable-next-line no-console
        console.warn('Invalid or empty GraphQL error object.');
        return;
    }

    const titleStyle = 'font-weight: bold; color: red; font-size: 14px;';
    const labelStyle = 'color: #888; font-weight: bold;';
    const valueStyle = 'color: #000;';
    const divider = '-'.repeat(40);

    // eslint-disable-next-line no-console
    console.groupCollapsed('%cGraphQL Error', titleStyle);

    response.errors.forEach((err, idx) => {
        // eslint-disable-next-line no-console
        console.group(`%cError ${idx + 1}`, labelStyle);
        // eslint-disable-next-line no-console
        console.log(`%cMessage: %c${err.message}`, labelStyle, valueStyle);
        if (err.locations) {
            // eslint-disable-next-line no-console
            console.log(`%cLocation: %c${JSON.stringify(err.locations)}`, labelStyle, valueStyle);
        }
        if (err.path) {
            // eslint-disable-next-line no-console
            console.log(`%cPath: %c${err.path.join(' > ')}`, labelStyle, valueStyle);
        }
        if (err.extensions) {
            // eslint-disable-next-line no-console
            console.log(`%cExtensions: %c${JSON.stringify(err.extensions, null, 2)}`, labelStyle, valueStyle);
        }
        // eslint-disable-next-line no-console
        console.groupEnd();
    });
    // eslint-disable-next-line no-console
    console.log(`%c${divider}`, 'color: #ccc;');
    // eslint-disable-next-line no-console
    console.groupEnd();
}
