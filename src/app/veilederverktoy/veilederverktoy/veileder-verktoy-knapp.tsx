import React from 'react';
import TannHjulIkon from './../tannhjul.svg';
import { HiddenIfKnappFss } from '../../components/hidden-if/hidden-if-knapp';

function VeilederVerktoyKnapp (props: {hidden: boolean, onClick: () => void}) {
    return (
        <HiddenIfKnappFss
            icon={TannHjulIkon}
            iconAlt="Veilederverktoy"
            onClick={props.onClick}
        >
            Veilederverktøy
        </HiddenIfKnappFss>
    );
}

export default VeilederVerktoyKnapp;
