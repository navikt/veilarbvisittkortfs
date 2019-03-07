import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import Etiketter from './components/etiketter';
import Fodelsnummer from './components/fodelsnummer';
import './personinfo.less';
import Icon from './components/icon';
import { connect } from 'react-redux';
import { Personalia } from '../../types/personalia';
import { OppfolgingStatus } from '../../types/oppfolging-status';
import { Appstate } from '../../types/appstate';
import {useEffect} from "react";
import {hentPersonalia} from "../../store/personalia/actions";
import {Dispatch} from "redux";
import PersonaliaSelector from "../../store/personalia/selectors";
import NavFrontendSpinner from "nav-frontend-spinner";

interface StateProps {
    personalia: Personalia;
    oppfolgingstatus: OppfolgingStatus;
    isLoading: boolean;
}

interface DispatchProps {
    hentPersonalia: (fnr: string) => void;
}

interface OwnProps {
    fnr: string;
}

type PersonInfoProps = StateProps & DispatchProps & OwnProps;

function PersonInfo(props: PersonInfoProps) {
    useEffect(()=> {props.hentPersonalia(props.fnr)},[props.fnr]);

    if(props.isLoading){
        return <NavFrontendSpinner type='XL'/>
    }

    return (
        <div className="personinfo">
            <Icon kjonn={props.personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={props.fnr}/>
                <NavnOgAlder personalia={props.personalia}/>
                <Etiketter personalia={props.personalia} oppfolgingstatus={props.oppfolgingstatus}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    personalia: state.personalia.data,
    oppfolgingstatus: state.oppfolgingstatus.data,
    isLoading: PersonaliaSelector.selectPersonaliaIsLoading(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    hentPersonalia: (fnr: string) => dispatch(hentPersonalia(fnr))
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(PersonInfo);
