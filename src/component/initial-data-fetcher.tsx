import React, { useEffect } from 'react';
import { useDataStore } from '../store-midlertidig/data-store';
import { useFetchOppfolgingsstatus } from '../api/api-midlertidig';
import { useAppStore } from '../store-midlertidig/app-store';

export function InitialDataFetcher(props: { children: any }) {
    const { brukerFnr } = useAppStore();
    const {} = useDataStore();

    const fetchOppfolgingsstatus = useFetchOppfolgingsstatus(brukerFnr);

    useEffect(() => {
        if (fetchOppfolgingsstatus.data) {
        }
    }, [fetchOppfolgingsstatus]);

    // dispatch(hentOppfolgingsstatus(fnr));
    // dispatch(hentOppfolging(fnr));
    // dispatch(hentPaloggetVeileder());
    // dispatch(hentPersonalia(fnr));
    // dispatch(hentTilgangTilBrukersKontor(fnr));
    // dispatch({ type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet });
    // dispatch(hentHarBruktNivaa4(fnr));

    // useEffect(() => {
    //     if (harTilgangTilBrukersKontor && underOppfolging) {
    //         dispatch(hentArbeidsliste(fnr));
    //     }
    // }, [fnr, dispatch, harTilgangTilBrukersKontor, underOppfolging]);
    //
    // useEffect(() => {
    //     if (oppfolgingsenhetId) {
    //         dispatch(hentAlleVeiledereForEnheten(oppfolgingsenhetId));
    //     }
    // }, [oppfolgingsenhetId, dispatch]);
    //
    // if (isLoading) {
    //     return <NavFrontendSpinner type="XL" />;
    // }

    return <>{props.children}</>;
}
