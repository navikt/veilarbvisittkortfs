import constate from 'constate';
import { createFetchOppfolging, Oppfolging } from '../api/veilarboppfolging';
import { useAxios } from '../api/utils';

export const [FetcherStore, useFetcherStore] = constate(() => {
    const oppfolgingFetcher = useAxios<Oppfolging>({}, { manual: true });

    return {
        oppfolgingFetcher: {
            loading: oppfolgingFetcher.loading,
            data: oppfolgingFetcher.data,
            error: oppfolgingFetcher.error,
            response: oppfolgingFetcher.response,
            fetch: createFetchOppfolging(oppfolgingFetcher),
        },
    };
});
