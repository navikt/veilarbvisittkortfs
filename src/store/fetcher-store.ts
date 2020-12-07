import constate from 'constate';
import { fetchOppfolging } from '../api/veilarboppfolging';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';

/**
 * Context store for fetchers.
 * Brukes av komponenter som trenger å vite fetch status fra kall gjort i andre komponenter
 */
export const [FetcherStore, useFetcherStore] = constate(() => {
    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);

    return {
        oppfolgingFetcher,
    };
});
