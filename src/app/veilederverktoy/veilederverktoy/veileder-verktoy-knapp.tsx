import React from 'react';
import TannHjulIkon from './../tannhjul.svg';
import { Hovedknapp } from 'nav-frontend-knapper';
import hiddenIf from '../../components/hidden-if';

const HiddenIfHovedKnapp = hiddenIf(Hovedknapp);

function VeilederVerktoyKnapp (props: {hidden: boolean, onClick: () => void}) {
    return (
        <HiddenIfHovedKnapp
            className="veilederverktoy_knapp"
            onClick={props.onClick}
            hidden={!props.hidden}
        >
            Veilederverktoy
            <img src={TannHjulIkon} alt="Veilederverktoy"/>
        </HiddenIfHovedKnapp>);
}

export default VeilederVerktoyKnapp;