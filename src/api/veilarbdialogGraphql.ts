import { Dialog, EskaleringsvarselHistorikkInnslag, GjeldendeEskaleringsvarsel } from './veilarbdialog';

export const stansVarselQuery = `
    query($fnr: String!) {
        stansVarsel(fnr: $fnr) {
            id,
            tilhorendeDialogId,
            opprettetAv,
            opprettetDato,
            opprettetBegrunnelse
        }
    }
`;

export const dialogerQuery = `
    query($fnr: String!) {
        dialoger(fnr: $fnr) {
            ferdigBehandlet,
            historisk,
            id,
            venterPaSvar
        }
    }
`;

export const stansVarselHistorikkQuery = `
    query($fnr: String!) {
            stansVarselHistorikk(fnr: $fnr) {
                id,
                tilhorendeDialogId,
                opprettetAv,
                opprettetDato,
                opprettetBegrunnelse
                avsluttetAv,
                avsluttetDato,
                avsluttetBegrunnelse
            }
        }
`;

interface GraphqlError {
    message: string;
}

interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
}
export type DialogerResponse = GraphqlResponse<{ dialoger: Dialog[] }>;
export type StansVarselResponse = GraphqlResponse<{ stansVarsel: GjeldendeEskaleringsvarsel }>;
export type StansVarselHistorikkResponse = GraphqlResponse<{
    stansVarselHistorikk: EskaleringsvarselHistorikkInnslag[];
}>;

export const veilarbdialogGraphqlQuery = (fnr: string, query: string) => {
    return {
        query,
        variables: {
            fnr
        }
    };
};

export type StansVarselQueryRequest = ReturnType<typeof veilarbdialogGraphqlQuery>;
