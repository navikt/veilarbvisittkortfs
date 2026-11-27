import useSWR from 'swr';
import { fetchWithPost, HttpError, swrOptions } from './httpUtils';
import { GraphqlResponse } from './GraphqlUtils';

export type PlanlagtMote = {
    id: string;
    fraDato: string;
};

export interface VeilarbAktivitetGraphqlRequest {
    query: string;
    variables: { fnr: string };
}

export interface AktivitetsDataGraphqlResponse {
    planlagteMoter: PlanlagtMote[] | null;
}

export interface AktivitetData {
    planlagteMoter: PlanlagtMote[] | undefined;
}

const graphqlUrl = '/veilarbaktivitet/api/graphql';

const graphqlQuery = `
    query hentAktivtetsData($fnr: String!) {
        planlagteMoter(fnr: $fnr) {
            id
            fraDato
        }
    }
`;

const mapTilAktivitetsData = (data: GraphqlResponse<AktivitetsDataGraphqlResponse>): AktivitetData | undefined => {
    if ((data.errors?.length || 0) != 0) {
        throw new Error(
            `Feilet å hente aktivitetsdata (graphql) fra veilarbaktivitet: ${data.errors.map(it => it.message).join(',')}`
        );
    }
    if (!data.data) throw new Error(`Forventet "data" i graphql response men fikk ingenting`);
    return {
        planlagteMoter: data.data.planlagteMoter || undefined
    };
};

export const useVeilarbaktivitetData = (fnr: string | undefined) => {
    const { data, error, isLoading, mutate } = useSWR<AktivitetData | undefined, HttpError>(
        fnr ? `${graphqlUrl}/${fnr}` : null,
        () =>
            fetchWithPost(graphqlUrl, {
                query: graphqlQuery,
                variables: { fnr: fnr as string }
            }).then(res => mapTilAktivitetsData(res)),
        swrOptions
    );

    return { aktiviteter: data, isLoading, error, mutate };
};
