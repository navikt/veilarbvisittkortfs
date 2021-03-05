import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { fetchFeaturesToggles } from '../api/veilarbpersonflatefs';
import { useAppStore } from '../store/app-store';
import { fetchOppfolging, fetchOppfolgingsstatus, fetchTilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { fetchPersonalia, fetchPersonaliaV2 } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { fetchArbeidsliste } from '../api/veilarbportefolje';
import { ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import './data-fetcher.less';
import { isAnyLoadingOrNotStarted } from '../api/utils';
import NavFrontendSpinner from 'nav-frontend-spinner';

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
        setPersonaliaV2,
    } = useDataStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const oppfolgingstatusFetcher = useAxiosFetcher(fetchOppfolgingsstatus);
    const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
    const featureToggleFetcher = useAxiosFetcher(fetchFeaturesToggles);
    const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
    const personaliaV2Fetcher = useAxiosFetcher(fetchPersonaliaV2);
    const tilgangTilBrukersKontorFetcher = useAxiosFetcher(fetchTilgangTilBrukersKontor);
    const arbeidslisteFetcher = useAxiosFetcher(fetchArbeidsliste);
    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);

    const oppfolgingsEnhet = oppfolgingstatusFetcher.data?.oppfolgingsenhet.enhetId || '';

    useEffect(() => {
        oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging)).catch();
        oppfolgingstatusFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolgingsstatus)).catch();
        personaliaFetcher.fetch(brukerFnr).then(ifResponseHasData(setPersonalia)).catch();
        personaliaV2Fetcher.fetch(brukerFnr).then(ifResponseHasData(setPersonaliaV2)).catch();
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

    if (
        isAnyLoadingOrNotStarted(
            oppfolgingstatusFetcher,
            oppfolgingFetcher,
            innloggetVeilederFetcher,
            personaliaFetcher,
            personaliaV2Fetcher,
            tilgangTilBrukersKontorFetcher
        )
    ) {
        return <NavFrontendSpinner className="visittkort-laster" type="L" />;
    }

    return <>{props.children}</>;
}
