import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { hentOppfolgingsstatus, HentOppfolgingstatusAction } from '../../store/oppfolging-status/actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Appstate } from '../../types/appstate';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentOppfolging, HentOppfolgingAction } from '../../store/oppfolging/actions';
import OppfolgingsstatusSelector from '../../store/oppfolging-status/selectors';
import OppfolgingSelector from '../../store/oppfolging/selector';
import { HentPaloggetVeilederAction, hentPaloggetVeileder } from '../../store/tildel-veileder/actions';
import {hentPersonalia, HentPersonaliaAction} from "../../store/personalia/actions";
import PersonaliaSelector from "../../store/personalia/selectors";

interface DispatchProps {
    hentOppfolgingsstatus: (fnr: string) => HentOppfolgingstatusAction;
    hentOppfolging: (fnr: string ) => HentOppfolgingAction;
    hentPaloggetVeileder: () => HentPaloggetVeilederAction;
    hentPersonalia: (fnr: string) => HentPersonaliaAction;
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
        props.hentOppfolgingsstatus(props.fnr);
        props.hentOppfolging(props.fnr);
        props.hentPaloggetVeileder();
        props.hentPersonalia(props.fnr);
    }, [props.fnr]);

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
        {hentOppfolgingsstatus,hentOppfolging,hentPaloggetVeileder,hentPersonalia},
        dispatch);
};

const mapStateToProps = (state: Appstate): StateProps => ({
    isLoading:
        OppfolgingsstatusSelector.selectOppfolgingStatusStatus(state) ||
        OppfolgingSelector.selectOppfolgingStatus(state) ||
        PersonaliaSelector.selectPersonaliaIsLoading(state)

});

export default connect<StateProps, DispatchProps, InitialDataProviderProps>(mapStateToProps, mapDispatchToProps)(InitialDataProvider);