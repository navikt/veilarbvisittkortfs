import React, { useEffect } from 'react';
import { useDataStore } from '../store-midlertidig/data-store';
import {
    useFetchTilgangTilBrukersKontor,
    useFetchInnloggetVeileder,
    useFetchOppfolging,
    useFetchOppfolgingsstatus,
    useFetchPersonalia,
} from '../api/api-midlertidig';
import { useAppStore } from '../store-midlertidig/app-store';
import { isAnyLoading } from '../api/utils';
import NavFrontendSpinner from 'nav-frontend-spinner';

export function InitialDataFetcher(props: { children: any }) {
    const { brukerFnr } = useAppStore();
    const {
        setOppfolgingsstatus,
        setOppfolging,
        setInnloggetVeileder,
        setPersonalia,
        setTilgangTilBrukersKontor,
    } = useDataStore();

    const fetchOppfolgingsstatus = useFetchOppfolgingsstatus(brukerFnr);
    const fetchOppfolging = useFetchOppfolging(brukerFnr);
    const fetchInnloggetVeileder = useFetchInnloggetVeileder();
    const fetchPersonalia = useFetchPersonalia(brukerFnr);
    const fetchTilgangTilBrukersKontor = useFetchTilgangTilBrukersKontor(brukerFnr);

    useEffect(() => {
        if (fetchOppfolgingsstatus.data) {
            setOppfolgingsstatus(fetchOppfolgingsstatus.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchOppfolgingsstatus]);

    useEffect(() => {
        if (fetchOppfolging.data) {
            setOppfolging(fetchOppfolging.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchOppfolging]);

    useEffect(() => {
        if (fetchInnloggetVeileder.data) {
            setInnloggetVeileder(fetchInnloggetVeileder.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchInnloggetVeileder]);

    useEffect(() => {
        if (fetchPersonalia.data) {
            setPersonalia(fetchPersonalia.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPersonalia]);

    useEffect(() => {
        if (fetchTilgangTilBrukersKontor.data) {
            setTilgangTilBrukersKontor(fetchTilgangTilBrukersKontor.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchTilgangTilBrukersKontor]);

    if (
        isAnyLoading(
            fetchOppfolgingsstatus,
            fetchOppfolging,
            fetchInnloggetVeileder,
            fetchPersonalia,
            fetchTilgangTilBrukersKontor
        )
    ) {
        return <NavFrontendSpinner type="L" />;
    }

    return <>{props.children}</>;
}
