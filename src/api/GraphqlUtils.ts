export interface GraphqlError {
    message: string;
}

export interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
}
