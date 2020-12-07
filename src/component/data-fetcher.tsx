import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { fetchFeaturesToggles } from '../api/veilarbpersonflatefs';
import { useAppStore } from '../store/app-store';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { fetchOppfolging, fetchOppfolgingsstatus, fetchTilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { fetchPersonalia } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { fetchArbeidsliste } from '../api/veilarbportefolje';
import { hasFields, ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import './data-fetcher.less';

export function DataFetcher(props: { children: any }) {
    const { brukerFnr } = useAppStore();
    const {
        oppfolgingsstatus,
        setOppfolgingsstatus,
        oppfolging,
        setOppfolging,
        innloggetVeileder,
        setInnloggetVeileder,
        personalia,
        setPersonalia,
        tilgangTilBrukersKontor,
        setTilgangTilBrukersKontor,
        setArbeidsliste,
        setVeilederePaEnhet,
        setFeatures,
    } = useDataStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const oppfolgingstatusFetcher = useAxiosFetcher(fetchOppfolgingsstatus);
    const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
    const featureToggleFetcher = useAxiosFetcher(fetchFeaturesToggles);
    const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
    const tilgangTilBrukersKontorFetcher = useAxiosFetcher(fetchTilgangTilBrukersKontor);
    const arbeidslisteFetcher = useAxiosFetcher(fetchArbeidsliste);
    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);

    const oppfolgingsEnhet = oppfolgingstatusFetcher.data?.oppfolgingsenhet.enhetId || '';

    const hasLoadedRequiredData =
        hasFields(oppfolgingsstatus) &&
        hasFields(oppfolging) &&
        hasFields(innloggetVeileder) &&
        hasFields(personalia) &&
        hasFields(tilgangTilBrukersKontor);

    useEffect(() => {
        oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging)).catch();
        oppfolgingstatusFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolgingsstatus)).catch();
        personaliaFetcher.fetch(brukerFnr).then(ifResponseHasData(setPersonalia)).catch();
        tilgangTilBrukersKontorFetcher.fetch(brukerFnr).then(ifResponseHasData(setTilgangTilBrukersKontor)).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    useEffect(() => {
        innloggetVeilederFetcher.fetch().then(ifResponseHasData(setInnloggetVeileder)).catch();
        featureToggleFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const harTilgang = tilgangTilBrukersKontorFetcher.data?.tilgangTilBrukersKontor;
        const underOppfolging = oppfolgingFetcher.data?.underOppfolging;

        if (harTilgang && underOppfolging) {
            arbeidslisteFetcher.fetch(brukerFnr).then(ifResponseHasData(setArbeidsliste)).catch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tilgangTilBrukersKontorFetcher, oppfolgingFetcher.data]);

    useEffect(() => {
        if (oppfolgingsEnhet) {
            veilederePaEnhetFetcher.fetch(oppfolgingsEnhet).then(ifResponseHasData(setVeilederePaEnhet)).catch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oppfolgingstatusFetcher]);

    if (!hasLoadedRequiredData) {
        return <NavFrontendSpinner className="visittkort-laster" type="L" />;
    }

    return <>{props.children}</>;
}
