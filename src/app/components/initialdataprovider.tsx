import React, {useEffect} from "react";
import { connect } from 'react-redux';
import {hentPersonalia} from "../../store/personalia/actions";
import {hentOppfolgingsstatus} from "../../store/oppfolging-status/actions";
import {bindActionCreators, Dispatch} from "redux";
import {hentArbeidsliste} from "../../store/arbeidsliste/actions";
import {Appstate} from "../../types/appstate";
import NavFrontendSpinner from "nav-frontend-spinner";


interface DispatchProps {
    doHentPersonData: (fnr:string) => void;
    doHentOppfolgingsstatus: (fnr: string) => void;
    doHentArbeidsliste: (fnr: string) => void;
}

interface InitialDataProviderProps {
    fnr:string;
    children: React.ReactNode
}

interface StateProps {
    isLoading: boolean;
}

type Props = InitialDataProviderProps & DispatchProps & StateProps;

function InitialDataProvider(props: Props){

    useEffect( () => {
        props.doHentPersonData(props.fnr);
        props.doHentOppfolgingsstatus(props.fnr);
        props.doHentArbeidsliste(props.fnr);
    }, []);

    if(props.isLoading){
        return <NavFrontendSpinner/>
    }
    return (
        <>
            {props.children}
        </>
    )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({hentOppfolgingsstatus, hentPersonalia, hentArbeidsliste} ,dispatch)
};

const mapStateToProps = (state: Appstate): StateProps => ({
    isLoading: true,
});

export default connect<StateProps,DispatchProps, InitialDataProviderProps>(mapStateToProps, mapDispatchToProps)(InitialDataProvider);