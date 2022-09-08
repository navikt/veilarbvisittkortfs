export type OrNothing<T> = T | undefined | null;
export type StringOrNothing = OrNothing<string>;

/**
 * Type som representerer felles properties mellom to typer A og B. Eksempel:
 *
 *  type A = {
 *      foo: string;
 *      bar: string;
 *  }
 *
 *  type B = {
 *      foo: number;
 *  }
 *
 *  Common<A, B> --> {
 *      foo: string | number;
 *  }
 *
 *  @see https://stackoverflow.com/a/47379147
 */
export type Common<A, B> = {
    [P in keyof A & keyof B]: A[P] | B[P];
};
