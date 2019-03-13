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
import PersonaliaSelector from "../../store/personalia/selectors";

interface StateProps {
    personalia: Personalia;
    oppfolgingstatus: OppfolgingStatus;
    navn: string;
}

interface OwnProps {
    fnr: string;
}

type PersonInfoProps = StateProps & OwnProps;

function PersonInfo(props: PersonInfoProps) {

    return (
        <div className="personinfo">
            <Icon kjonn={props.personalia.kjonn}/>
            <div className="personinfo__container">
                <Fodelsnummer fnr={props.fnr}/>
                <NavnOgAlder navn={props.navn} personalia={props.personalia}/>
                <Etiketter personalia={props.personalia} oppfolgingstatus={props.oppfolgingstatus}/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    personalia: state.personalia.data,
    navn: PersonaliaSelector.selectSammensattNavn(state),
    oppfolgingstatus: state.oppfolgingstatus.data,
});

export default connect<StateProps, OwnProps>(mapStateToProps)(PersonInfo);
