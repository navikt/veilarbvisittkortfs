import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hentOppfolgingsstatus } from '../../store/oppfolging-status/actions';
import { Appstate } from '../../types/appstate';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentOppfolging } from '../../store/oppfolging/actions';
import OppfolgingsstatusSelector from '../../store/oppfolging-status/selectors';
import OppfolgingSelector from '../../store/oppfolging/selector';
import { hentAlleVeiledereForEnheten, hentPaloggetVeileder } from '../../store/tildel-veileder/actions';
import { hentHarBruktNivaa4, hentPersonalia } from '../../store/personalia/actions';
import PersonaliaSelector from '../../store/personalia/selectors';
import { hentTilgangTilBrukersKontor } from '../../store/tilgang-til-brukerskontor/actions';
import { hentArbeidsliste } from '../../store/arbeidsliste/actions';

interface InitialDataProviderProps {
    fnr: string;
    enhet?: string;
}

function InitialDataProvider({ fnr, enhet, children }: PropsWithChildren<InitialDataProviderProps>) {
    const dispatch = useDispatch();
    const harTilgangTilBrukersKontor = useSelector(
        (state: Appstate) => state.tilgangTilBrukersKontor.data.tilgangTilBrukersKontor
    );
    const underOppfolging = useSelector(OppfolgingSelector.selectErUnderOppfolging);
    const oppfolgingsenhetId = useSelector((state: Appstate) =>
        OppfolgingsstatusSelector.selectOppfolgingsenhetsId(state)
    );

    const isLoading = useSelector(
        (state: Appstate) =>
            OppfolgingsstatusSelector.selectOppfolgingStatusStatus(state) ||
            OppfolgingSelector.selectOppfolgingStatus(state) ||
            PersonaliaSelector.selectPersonaliaIsLoading(state)
    );

    useEffect(() => {
        dispatch(hentOppfolgingsstatus(fnr));
        dispatch(hentOppfolging(fnr));
        dispatch(hentPaloggetVeileder());
        dispatch(hentPersonalia(fnr));
        dispatch(hentTilgangTilBrukersKontor(fnr));
        dispatch({ type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet });
        dispatch(hentHarBruktNivaa4(fnr));
    }, [fnr, dispatch, enhet]);

    useEffect(() => {
        if (harTilgangTilBrukersKontor && underOppfolging) {
            dispatch(hentArbeidsliste(fnr));
        }
    }, [fnr, dispatch, harTilgangTilBrukersKontor, underOppfolging]);

    useEffect(() => {
        if (oppfolgingsenhetId) {
            dispatch(hentAlleVeiledereForEnheten(oppfolgingsenhetId));
        }
    }, [oppfolgingsenhetId, dispatch]);

    if (isLoading) {
        return <NavFrontendSpinner type="XL" />;
    }
    return <>{children}</>;
}

export default InitialDataProvider;
