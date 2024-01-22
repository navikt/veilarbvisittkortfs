import React, { useEffect } from 'react';
import { useDataStore } from '../store/data-store';
import { useAppStore } from '../store/app-store';
import { fetchOppfolging, fetchOppfolgingsstatus, fetchTilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { fetchPersonalia, fetchSpraakTolk, fetchVergeOgFullmakt } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { fetchArbeidsliste, fetchHuskelapp } from '../api/veilarbportefolje';
import { ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import './data-fetcher.less';
import { isAnyLoadingOrNotStarted } from '../api/utils';
import { Loader } from '@navikt/ds-react';
import { hentGjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { useFetchFeaturesFromOboUnleash } from '../api/veilarbpersonflatefs';

export function DataFetcher(props: { children: any }) {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const {
        setOppfolgingsstatus,
        setOppfolging,
        setInnloggetVeileder,
        setPersonalia,
        setTilgangTilBrukersKontor,
        setArbeidsliste,
        setVeilederePaEnhet,
        setFeatures,
        setVergeOgFullmakt,
        setSpraakTolk,
        setGjeldendeEskaleringsvarsel,
        setHuskelapp,
    } = useDataStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const oppfolgingstatusFetcher = useAxiosFetcher(fetchOppfolgingsstatus);
    const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
    const featureToggleFetcher = useAxiosFetcher(useFetchFeaturesFromOboUnleash);
    const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
    const tilgangTilBrukersKontorFetcher = useAxiosFetcher(fetchTilgangTilBrukersKontor);
    const arbeidslisteFetcher = useAxiosFetcher(fetchArbeidsliste);
    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);
    const vergeOgFullmaktFetcher = useAxiosFetcher(fetchVergeOgFullmakt);
    const spraakTolkFetcher = useAxiosFetcher(fetchSpraakTolk);
    const gjeldendeEskaleringsvarselFetcher = useAxiosFetcher(hentGjeldendeEskaleringsvarsel);
    const huskelappFetcher = useAxiosFetcher(fetchHuskelapp);

    const behandlingsnummer = 'B643';
    const oppfolgingsEnhet = oppfolgingstatusFetcher.data?.oppfolgingsenhet.enhetId || '';

    useEffect(() => {
        oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging)).catch();
        oppfolgingstatusFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolgingsstatus)).catch();
        tilgangTilBrukersKontorFetcher.fetch(brukerFnr).then(ifResponseHasData(setTilgangTilBrukersKontor)).catch();
        gjeldendeEskaleringsvarselFetcher
            .fetch(brukerFnr)
            .then(ifResponseHasData(setGjeldendeEskaleringsvarsel))
            .catch();
        vergeOgFullmaktFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setVergeOgFullmakt)).catch();
        spraakTolkFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setSpraakTolk)).catch();
        personaliaFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setPersonalia)).catch();
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

        if (visVeilederVerktoy && harTilgang && underOppfolging) {
            arbeidslisteFetcher.fetch(brukerFnr).then(ifResponseHasData(setArbeidsliste)).catch();
            if(oppfolgingsEnhet) {
                huskelappFetcher.fetch(brukerFnr, oppfolgingsEnhet).then(ifResponseHasData(setHuskelapp)).catch()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visVeilederVerktoy, tilgangTilBrukersKontorFetcher, oppfolgingFetcher.data, oppfolgingstatusFetcher.data]);

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
            featureToggleFetcher,
            tilgangTilBrukersKontorFetcher
            // trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
        )
    ) {
        return <Loader className="visittkort-laster" size="xlarge" />;
    }

    return <>{props.children}</>;
}
