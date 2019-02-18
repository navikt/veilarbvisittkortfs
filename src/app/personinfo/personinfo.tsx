import * as React from 'react';
import NavnOgAlder from './components/navnogalder';
import Etiketter from './components/etiketter';
import Fodelsnummer from './components/fodelsnummer';
import './personinfo.less';
import Icon from "./components/icon";
import {connect} from 'react-redux';
import {Personalia} from "../../types/personalia";
import {OppfolgingStatus} from "../../types/oppfolging-status";


function PersonInfo(props: {personalia: Personalia, oppfolgingstatus: OppfolgingStatus} ) {
    return (
        <div className="personinfo">
            <Icon kjonn={props.personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={props.personalia.fodselsnummer}/>
                <NavnOgAlder personalia={props.personalia}/>
                <Etiketter personalia={props.personalia} oppfolgingstatus={props.oppfolgingstatus}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state:any)=> ({
    personalia: state.personalia.data,
    oppfolgingstatus: state.oppfolgingstatus.data,
});

export default connect<{personalia: Personalia, oppfolgingstatus: OppfolgingStatus}>(mapStateToProps)(PersonInfo);
