import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { hentPersonalia, HentPersonaliaAction } from '../../store/personalia/actions';
import { hentOppfolgingsstatus, HentOppfolgingstatusAction } from '../../store/oppfolging-status/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { hentArbeidsliste, HentArbeidslisteAction } from '../../store/arbeidsliste/actions';
import { Appstate } from '../../types/appstate';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentOppfolging, HentOppfolgingAction } from '../../store/oppfolging/actions';
import OppfolgingsstatusSelector from '../../store/oppfolging-status/selectors';
import PersonaliaSelector from '../../store/personalia/selectors';
import ArbeidsListeSelector from '../../store/arbeidsliste/selector';
import OppfolgingSelector from '../../store/oppfolging/selector';
import { HentPaloggetVeilederAction, hentPaloggetVeileder } from '../../store/tildel-veileder/actions';

interface DispatchProps {
    hentPersonalia: (fnr: string) => HentPersonaliaAction;
    hentOppfolgingsstatus: (fnr: string) => HentOppfolgingstatusAction;
    hentArbeidsliste: (fnr: string) => HentArbeidslisteAction;
    hentOppfolging: (fnr: string ) => HentOppfolgingAction;
    hentPaloggetVeileder: () => HentPaloggetVeilederAction;
}

interface InitialDataProviderProps {
    fnr: string;
    children: React.ReactNode;
}

interface StateProps {
    isLoading: boolean;
}

type Props = InitialDataProviderProps & DispatchProps & StateProps;

function InitialDataProvider(props: Props) {

    useEffect( () => {
        props.hentPersonalia(props.fnr);
        props.hentOppfolgingsstatus(props.fnr);
        props.hentArbeidsliste(props.fnr);
        props.hentOppfolging(props.fnr);
        props.hentPaloggetVeileder(); //TODO SPLIT UP I OPPFOLGINGSPROVIDER ?
    }, []);

    if (props.isLoading) {
        return <NavFrontendSpinner type="XL"/>;
    }
    return (
        <>
            {props.children}
        </>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {hentPersonalia, hentOppfolgingsstatus, hentArbeidsliste, hentOppfolging, hentPaloggetVeileder},
        dispatch);
};

const mapStateToProps = (state: Appstate): StateProps => ({
    isLoading:
        OppfolgingsstatusSelector.selectOppfolgingStatusStatus(state) ||
        PersonaliaSelector.selectPersonaliaIsLoading(state) ||
        ArbeidsListeSelector.selectArbeidslisteStatus(state) ||
        OppfolgingSelector.selectOppfolgingStatus(state)

});

export default connect<StateProps, DispatchProps, InitialDataProviderProps>(mapStateToProps, mapDispatchToProps)(InitialDataProvider);