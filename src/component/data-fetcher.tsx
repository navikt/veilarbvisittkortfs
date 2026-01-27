import React from 'react';
import { Loader } from '@navikt/ds-react';
import { useBrukerFnr } from '../store/app-store';
import { useOppfolging, useOppfolgingsstatus } from '../api/veilarboppfolging';
import { usePersonalia, useVerge, useFullmakt, useSpraakTolk } from '../api/veilarbperson';
import { useInnloggetVeileder, useVeilederePaEnhet } from '../api/veilarbveileder';
import { useGjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { useFeaturesFromOboUnleash } from '../api/veilarbpersonflatefs';
import './data-fetcher.less';
import { useVisVeilederVerktøy } from '../store/visittkort-config';

interface Props {
    children: (brukerFnr: string) => React.ReactNode;
}

export function DataFetcher({ children }: Props) {
    const brukerFnr = useBrukerFnr();
    const visVeilederVerktoy = useVisVeilederVerktøy();

    // Start henting av data
    const { data: oppfolgingsstatus, isLoading: oppfolgingsstatusIsLoading } = useOppfolgingsstatus(brukerFnr);
    const { isLoading: oppfolgingIsLoading } = useOppfolging(brukerFnr);
    const { isLoading: personaliaIsLoading } = usePersonalia(brukerFnr);
    const { isLoading: innloggetVeilederIsLoading } = useInnloggetVeileder();
    useFeaturesFromOboUnleash();
    useVerge(brukerFnr);
    useFullmakt(brukerFnr);
    useSpraakTolk(brukerFnr);

    const oppfolgingsEnhet = oppfolgingsstatus?.oppfolgingsenhet.enhetId || undefined;

    // Bare hent disse hvis visVeilederVerktoy er konfigurert til true
    useVeilederePaEnhet(visVeilederVerktoy ? oppfolgingsEnhet : undefined);
    useGjeldendeEskaleringsvarsel(visVeilederVerktoy ? brukerFnr : undefined);

    if (
        innloggetVeilederIsLoading ||
        oppfolgingsstatusIsLoading ||
        personaliaIsLoading ||
        oppfolgingIsLoading
        // trenger ikke vente på vergeOgFullmaktFetcher eller spraakTolkFetcher
    ) {
        return <Loader className="visittkort-laster" size="xlarge" />;
    }

    if (!brukerFnr) return null;
    return <>{children(brukerFnr)}</>;
}
