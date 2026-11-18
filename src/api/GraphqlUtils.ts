export interface GraphqlError {
    message: string;
    path?: (string | number)[];
}

export interface GraphqlResponse<T> {
    data: T;
    errors: GraphqlError[];
}
