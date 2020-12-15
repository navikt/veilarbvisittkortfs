import { AxiosError, AxiosPromise } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ActionFunction0<R> = () => R;
type ActionFunction1<T1, R> = (t1: T1) => R;
type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

interface FetchState<D> {
    loading: boolean;
    data?: D;
    error?: AxiosError;
}

interface UseAxiosFetcher<D = any, F = () => AxiosPromise<D>> extends FetchState<D> {
    fetch: F;
}

export function useAxiosFetcher<R>(
    fetcher: () => AxiosPromise<R>
): UseAxiosFetcher<R, ActionFunction0<AxiosPromise<R>>>;
export function useAxiosFetcher<T1, R>(
    fetcher: (t1: T1) => AxiosPromise<R>
): UseAxiosFetcher<R, ActionFunction1<T1, AxiosPromise<R>>>;
export function useAxiosFetcher<T1, T2, R>(
    fetcher: (t1: T1, t2: T2) => AxiosPromise<R>
): UseAxiosFetcher<R, ActionFunction2<T1, T2, AxiosPromise<R>>>;
export function useAxiosFetcher<T1, T2, T3, R>(
    fetcher: (t1: T1, t2: T2, t3: T3) => AxiosPromise<R>
): UseAxiosFetcher<R, ActionFunction3<T1, T2, T3, AxiosPromise<R>>>;
export function useAxiosFetcher<T1, T2, T3, T4, R>(
    fetcher: (t1: T1, t2: T2, t3: T3, t4: T4) => AxiosPromise<R>
): UseAxiosFetcher<R, ActionFunction4<T1, T2, T3, T4, AxiosPromise<R>>>;

export function useAxiosFetcher<R>(fetcher: (...args: any[]) => AxiosPromise<R>): UseAxiosFetcher<R> {
    const [fetchState, setFetchState] = useState<FetchState<R>>({ loading: false });
    const isMounted = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const axiosFetch = useCallback(
        (...args: any[]): AxiosPromise<R> => {
            setFetchState({ loading: true });
            return fetcher(...args)
                .then((res) => {
                    if (isMounted.current) {
                        setFetchState({ loading: false, data: res.data, error: undefined });
                    }
                    return res;
                })
                .catch((err) => {
                    if (isMounted.current) {
                        setFetchState({ loading: false, data: undefined, error: err });
                    }
                    throw err;
                });
        },
        [fetcher]
    );

    return useMemo(() => ({ ...fetchState, fetch: axiosFetch }), [fetchState, axiosFetch]);
}
