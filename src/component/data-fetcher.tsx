import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { useAppStore } from '../store/app-store';
import { fetchOppfolging, useOppfolgingsstatus } from '../api/veilarboppfolging';
import { fetchFullmakt, fetchPersonalia, fetchSpraakTolk, fetchVergeOgFullmakt } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import './data-fetcher.less';
import { isAnyLoadingOrNotStarted } from '../api/utils';
import { Loader } from '@navikt/ds-react';
import { hentGjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { BRUK_NY_KILDE_TIL_FULLMAKT, useFetchFeaturesFromOboUnleash } from '../api/veilarbpersonflatefs';

export function DataFetcher(props: { children: React.ReactNode }) {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const {
        setOppfolging,
        setInnloggetVeileder,
        setPersonalia,
        setVeilederePaEnhet,
        setFeatures,
        setVergeOgFullmakt,
        setSpraakTolk,
        setGjeldendeEskaleringsvarsel,
        setFullmakter,
        features
    } = useDataStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
    const featureToggleFetcher = useAxiosFetcher(useFetchFeaturesFromOboUnleash);
    const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);
    const vergeOgFullmaktFetcher = useAxiosFetcher(fetchVergeOgFullmakt);
    const fullmaktFetcher = useAxiosFetcher(fetchFullmakt);
    const spraakTolkFetcher = useAxiosFetcher(fetchSpraakTolk);
    const gjeldendeEskaleringsvarselFetcher = useAxiosFetcher(hentGjeldendeEskaleringsvarsel);
    const { data: oppfolgingsstatus, isLoading: oppfolgingsstatusIsLoading } = useOppfolgingsstatus(brukerFnr);

    const behandlingsnummer = 'B643';
    const oppfolgingsEnhet = oppfolgingsstatus?.oppfolgingsenhet.enhetId || '';

    useEffect(() => {
        oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging)).catch();
        if (visVeilederVerktoy) {
            gjeldendeEskaleringsvarselFetcher
                .fetch(brukerFnr)
                .then(ifResponseHasData(setGjeldendeEskaleringsvarsel))
                .catch();
        }
        vergeOgFullmaktFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setVergeOgFullmakt)).catch();
        if (features[BRUK_NY_KILDE_TIL_FULLMAKT]) {
            fullmaktFetcher.fetch(brukerFnr).then(ifResponseHasData(setFullmakter)).catch();
        }
        spraakTolkFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setSpraakTolk)).catch();
        personaliaFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setPersonalia)).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr, visVeilederVerktoy]);

    useEffect(() => {
        innloggetVeilederFetcher.fetch().then(ifResponseHasData(setInnloggetVeileder)).catch();
        featureToggleFetcher.fetch().then(ifResponseHasData(setFeatures)).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (visVeilederVerktoy && oppfolgingsEnhet) {
            veilederePaEnhetFetcher.fetch(oppfolgingsEnhet).then(ifResponseHasData(setVeilederePaEnhet)).catch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [oppfolgingsstatus, visVeilederVerktoy]);

    if (
        oppfolgingsstatusIsLoading ||
        isAnyLoadingOrNotStarted(
            oppfolgingFetcher,
            innloggetVeilederFetcher,
            personaliaFetcher,
            featureToggleFetcher
            // trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
        )
    ) {
        return <Loader className="visittkort-laster" size="xlarge" />;
    }

    return <>{props.children}</>;
}
