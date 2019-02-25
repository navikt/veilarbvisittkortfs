import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { hentPersonalia } from '../../store/personalia/actions';
import { hentOppfolgingsstatus } from '../../store/oppfolging-status/actions';
import { Dispatch } from 'redux';
import { hentArbeidsliste } from '../../store/arbeidsliste/actions';
import { Appstate } from '../../types/appstate';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { hentOppfolging } from '../../store/oppfolging/actions';

interface DispatchProps {
    doHentPersonData: () => void;
    doHentOppfolgingsstatus: () => void;
    doHentArbeidsliste: () => void;
    doHentOppfolging: () => void;
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
        props.doHentPersonData();
        props.doHentOppfolgingsstatus();
        props.doHentArbeidsliste();
        props.doHentOppfolging();
    }, []);

    if (props.isLoading) {
        return <NavFrontendSpinner/>;
    }
    return (
        <>
            {props.children}
        </>
    );
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: InitialDataProviderProps) => ({
    doHentPersonData: () => dispatch(hentPersonalia(ownProps.fnr)),
    doHentOppfolgingsstatus: () => dispatch(hentOppfolgingsstatus(ownProps.fnr)),
    doHentArbeidsliste: () => dispatch(hentArbeidsliste(ownProps.fnr)),
    doHentOppfolging: () => dispatch(hentOppfolging(ownProps.fnr))
});

const mapStateToProps = (state: Appstate): StateProps => ({
    isLoading: state.arbeidsliste.isLoading || state.oppfolgingstatus.isLoading || state.oppfolging.isLoading || state.personalia.isLoading,
});

export default connect<StateProps, DispatchProps, InitialDataProviderProps>(mapStateToProps, mapDispatchToProps)(InitialDataProvider);