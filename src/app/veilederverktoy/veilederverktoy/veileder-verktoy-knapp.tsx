import React from 'react';
import TannHjulIkon from './../tannhjul.svg';
import { HiddenIfHovedKnapp } from '../../components/hidden-if/hidden-if-knapp';

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