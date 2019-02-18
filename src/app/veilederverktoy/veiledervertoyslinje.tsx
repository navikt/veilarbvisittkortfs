import React from 'react';
import './veilederverktoy.less';
import Arbeidslistekomponent from "./arbeidsliste/arbeidslistekomponent";
import TannHjulIkon from './tannhjul.svg';
import TildelVeileder from "./tildel-veileder/tildel-veileder";
import {Hovedknapp} from "nav-frontend-knapper";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {navigerTilProsesser} from "../../store/navigation/actions";
import VeilederVerktoyNavigation from "./veilederverktoy/veilederverktoy-navigation";



function Veilederverktoyslinje(props:{navigerTilProsesser: () => void}) {
    return (
        <div className="veilederverktoyslinje">
            <div className="veilederverktoyslinje__container">
                <Arbeidslistekomponent/>
                <TildelVeileder/>
                <Hovedknapp className="veilederverktoy_knapp" onClick={props.navigerTilProsesser}>
                    Veilederverktoy
                    <img src={TannHjulIkon} alt="Veilederverktoy"/>
                </Hovedknapp>
                <VeilederVerktoyNavigation/>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch)=> ({
    navigerTilProsesser: () => dispatch(navigerTilProsesser())
});


export default connect(null, mapDispatchToProps) (Veilederverktoyslinje);