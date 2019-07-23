import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hentOppfolgingsstatus } from '../../store/oppfolging-status/actions';
import { Appstate } from '../../types/appstate';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentOppfolging } from '../../store/oppfolging/actions';
import OppfolgingsstatusSelector from '../../store/oppfolging-status/selectors';
import OppfolgingSelector from '../../store/oppfolging/selector';
import { hentPaloggetVeileder } from '../../store/tildel-veileder/actions';
import { hentPersonalia } from '../../store/personalia/actions';
import PersonaliaSelector from '../../store/personalia/selectors';
import {
    hentTilgangTilBrukersKontor,
} from '../../store/tilgang-til-brukerskontor/actions';

interface InitialDataProviderProps {
    fnr: string;
    enhet?: string;
    children: React.ReactNode;
}

function InitialDataProvider({fnr, enhet, children}: InitialDataProviderProps) {
    const dispatch = useDispatch();

    const isLoading = useSelector((state: Appstate) =>
        OppfolgingsstatusSelector.selectOppfolgingStatusStatus(state) ||
        OppfolgingSelector.selectOppfolgingStatus(state) ||
        PersonaliaSelector.selectPersonaliaIsLoading(state));

    useEffect( () => {
        dispatch(hentOppfolgingsstatus(fnr));
        dispatch(hentOppfolging(fnr));
        dispatch(hentPaloggetVeileder());
        dispatch(hentPersonalia(fnr));
        dispatch(hentTilgangTilBrukersKontor(fnr));
        dispatch({type: 'SETT_ENHET_FRA_PERSONFLATEFS', enhet});
    }, [fnr, dispatch, enhet]);

    if (isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }
    return (
        <>
            {children}
        </>
    );
}

export default InitialDataProvider;