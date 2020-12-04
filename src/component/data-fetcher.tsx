import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { useFetchFeatures } from '../api/veilarbpersonflatefs';
import { useAppStore } from '../store/app-store';
import { isAnyLoading } from '../api/utils';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { useFetchOppfolgingsstatus, useFetchTilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { useFetchPersonalia } from '../api/veilarbperson';
import { useFetchInnloggetVeileder, useFetchVeilederePaEnhet } from '../api/veilarbveileder';
import { useFetchArbeidsliste } from '../api/veilarbportefolje';
import { useFetcherStore } from '../store/fetcher-store';
import { ifResponseHasData } from '../util/utils';
import './data-fetcher.less';

export function DataFetcher(props: { children: any }) {
    const { brukerFnr } = useAppStore();
    const {
        setOppfolgingsstatus,
        setOppfolging,
        setInnloggetVeileder,
        setPersonalia,
        setTilgangTilBrukersKontor,
        setArbeidsliste,
        setVeilederePaEnhet,
        setFeatures,
    } = useDataStore();

    const { oppfolgingFetcher } = useFetcherStore();

    const fetchOppfolgingsstatus = useFetchOppfolgingsstatus(brukerFnr);
    const fetchInnloggetVeileder = useFetchInnloggetVeileder();
    const fetchPersonalia = useFetchPersonalia(brukerFnr);
    const fetchTilgangTilBrukersKontor = useFetchTilgangTilBrukersKontor(brukerFnr);
    const fetchFeatures = useFetchFeatures();

    const oppfolgingsEnhet = fetchOppfolgingsstatus?.data?.oppfolgingsenhet.enhetId || '';

    const fetchArbeidsliste = useFetchArbeidsliste(brukerFnr, { manual: true });
    const fetchVeiledere = useFetchVeilederePaEnhet(oppfolgingsEnhet, { manual: true });

    useEffect(() => {
        oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        if (fetchOppfolgingsstatus.data) {
            setOppfolgingsstatus(fetchOppfolgingsstatus.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchOppfolgingsstatus]);

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

    useEffect(() => {
        if (fetchFeatures.data) {
            setFeatures(fetchFeatures.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFeatures]);

    useEffect(() => {
        if (fetchArbeidsliste.data) {
            setArbeidsliste(fetchArbeidsliste.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchArbeidsliste]);

    useEffect(() => {
        if (fetchVeiledere.data) {
            setVeilederePaEnhet(fetchVeiledere.data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchVeiledere]);

    useEffect(() => {
        const harTilgang =
            fetchTilgangTilBrukersKontor.data && fetchTilgangTilBrukersKontor.data.tilgangTilBrukersKontor;
        const underOppfolging = oppfolgingFetcher.data && oppfolgingFetcher.data.underOppfolging;

        if (harTilgang && underOppfolging) {
            fetchArbeidsliste.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchTilgangTilBrukersKontor, oppfolgingFetcher.data]);

    useEffect(() => {
        if (oppfolgingsEnhet) {
            fetchVeiledere.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchOppfolgingsstatus]);

    if (
        isAnyLoading(
            fetchOppfolgingsstatus,
            oppfolgingFetcher,
            fetchInnloggetVeileder,
            fetchPersonalia,
            fetchTilgangTilBrukersKontor
        )
    ) {
        return <NavFrontendSpinner className="visittkort-laster" type="L" />;
    }

    return <>{props.children}</>;
}
