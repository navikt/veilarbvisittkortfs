import { HttpError, HttpPromise } from '../../api/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type ActionFunction0<R> = () => R;
type ActionFunction1<T1, R> = (t1: T1) => R;
type ActionFunction2<T1, T2, R> = (t1: T1, t2: T2) => R;
type ActionFunction3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
type ActionFunction4<T1, T2, T3, T4, R> = (t1: T1, t2: T2, t3: T3, t4: T4) => R;

interface FetchState<D> {
    loading: boolean;
    data?: D;
    error?: HttpError;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface UseFetcher<D = any, F = () => HttpPromise<D>> extends FetchState<D> {
    fetch: F;
}

export function useFetcher<R>(fetcher: () => HttpPromise<R>): UseFetcher<R, ActionFunction0<HttpPromise<R>>>;
export function useFetcher<T1, R>(
    fetcher: (t1: T1) => HttpPromise<R>
): UseFetcher<R, ActionFunction1<T1, HttpPromise<R>>>;
export function useFetcher<T1, T2, R>(
    fetcher: (t1: T1, t2: T2) => HttpPromise<R>
): UseFetcher<R, ActionFunction2<T1, T2, HttpPromise<R>>>;
export function useFetcher<T1, T2, T3, R>(
    fetcher: (t1: T1, t2: T2, t3: T3) => HttpPromise<R>
): UseFetcher<R, ActionFunction3<T1, T2, T3, HttpPromise<R>>>;
export function useFetcher<T1, T2, T3, T4, R>(
    fetcher: (t1: T1, t2: T2, t3: T3, t4: T4) => HttpPromise<R>
): UseFetcher<R, ActionFunction4<T1, T2, T3, T4, HttpPromise<R>>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFetcher<R>(fetcher: (...args: any[]) => HttpPromise<R>): UseFetcher<R> {
    const [fetchState, setFetchState] = useState<FetchState<R>>({ loading: false });
    const isMounted = useRef<boolean>(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const axiosFetch = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (...args: any[]): HttpPromise<R> => {
            setFetchState({ loading: true });
            return fetcher(...args)
                .then(res => {
                    if (isMounted.current) {
                        setFetchState({ loading: false, data: res.data, error: undefined });
                    }
                    return res;
                })
                .catch(err => {
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
