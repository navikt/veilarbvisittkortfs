import React, { useEffect } from 'react';
import { Loader } from '@navikt/ds-react';
import { useDataStore } from '../store/data-store';
import { useAppStore } from '../store/app-store';
import { fetchOppfolging, useOppfolgingsstatus } from '../api/veilarboppfolging';
import { fetchFullmakt, fetchPersonalia, fetchSpraakTolk, fetchVerge } from '../api/veilarbperson';
import { fetchInnloggetVeileder, fetchVeilederePaEnhet } from '../api/veilarbveileder';
import { ifResponseHasData } from '../util/utils';
import { useAxiosFetcher } from '../util/hook/use-axios-fetcher';
import { isAnyLoadingOrNotStarted } from '../api/utils';
import { hentGjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import './data-fetcher.less';

interface Props {
    children: React.ReactNode;
}

export function DataFetcher({ children }: Props) {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const {
        setOppfolging,
        setInnloggetVeileder,
        setPersonalia,
        setVeilederePaEnhet,
        setVerge,
        setSpraakTolk,
        setGjeldendeEskaleringsvarsel,
        setFullmakt
    } = useDataStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);
    const innloggetVeilederFetcher = useAxiosFetcher(fetchInnloggetVeileder);
    const personaliaFetcher = useAxiosFetcher(fetchPersonalia);
    const veilederePaEnhetFetcher = useAxiosFetcher(fetchVeilederePaEnhet);
    const vergeFetcher = useAxiosFetcher(fetchVerge);
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
        vergeFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setVerge)).catch();
        fullmaktFetcher.fetch(brukerFnr).then(ifResponseHasData(setFullmakt)).catch();
        spraakTolkFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setSpraakTolk)).catch();
        personaliaFetcher.fetch(brukerFnr, behandlingsnummer).then(ifResponseHasData(setPersonalia)).catch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr, visVeilederVerktoy]);

    useEffect(() => {
        innloggetVeilederFetcher.fetch().then(ifResponseHasData(setInnloggetVeileder)).catch();
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
            personaliaFetcher
            // trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
        )
    ) {
        return <Loader className="visittkort-laster" size="xlarge" />;
    }

    return <>{children}</>;
}
