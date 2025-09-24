import { axiosInstance, axiosJsonRequestConfig } from './utils';
import { GraphqlResponse } from './GraphqlUtils';

export interface ArbeidsOppfolgingKontorDTO {
    kontorId: string;
    ident: string;
}

export interface Kontor {
    kontorId: string;
    kontorNavn: string;
}

const graphqlQuery = `
    query($ident: String!) {
        alleKontor {
            kontorId,
            kontorNavn
        },
        kontorTilhorigheter(ident: $ident) {
            arena {
                kontorId,
                kontorNavn,
            }
            arbeidsoppfolging {
                kontorId,
                kontorNavn,
            }
            geografiskTilknytning {
                kontorId,
                kontorNavn,
            }
        }
        kontorHistorikk(ident: $ident) {
            kontorId,
            kontorType,
            endringsType,
            endretAv,
            endretAvType,
            endretTidspunkt,
        }
    }
`;

export interface KontorTilhorigheter {
    arena: {
        kontorId: string;
        kontorNavn: string;
    };
    arbeidsoppfolging: {
        kontorId: string;
        kontorNavn: string;
    };
    geografiskTilknytning: {
        kontorId: string;
        kontorNavn: string;
    };
}

export type KontorEndringsType =
    | 'AutomatiskRutetTilNOE'
    | 'AutomatiskRutetTilLokalkontor'
    | 'FlyttetAvVeileder'
    | 'FikkSkjerming'
    | 'MistetSkjerming'
    | 'FikkAddressebeskyttelse'
    | 'AddressebeskyttelseMistet'
    | 'EndretIArena'
    | 'EndretBostedsadresse';

export type KontorType = 'ARENA' | 'ARBEIDSOPPFOLGING' | 'GEOGRAFISK_TILKNYTNING';

export interface KontorHistorikkEntry {
    kontorId: string;
    kontorType: KontorType;
    endringsType: KontorEndringsType;
    endretAv: string;
    endretAvType: string;
    endretTidspunkt: string;
}

export function hentAlleKontor(ident: string) {
    return axiosInstance
        .post<
            GraphqlResponse<{
                alleKontor: Kontor[];
                kontorTilhorigheter: KontorTilhorigheter;
                kontorHistorikk: KontorHistorikkEntry[];
            }>
        >(
            `/ao-oppfolgingskontor/graphql`,
            JSON.stringify({
                query: graphqlQuery,
                variables: { ident }
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

/* kontorNavn istedetfor navn */
export interface KvittertKontor {
    kontorId: string;
    kontorNavn: string;
}

export function settKontor(arbeidsOppfolgingKontorDTO: ArbeidsOppfolgingKontorDTO) {
    return axiosInstance.post<{ fraKontor: KvittertKontor; tilKontor: KvittertKontor }>(
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
