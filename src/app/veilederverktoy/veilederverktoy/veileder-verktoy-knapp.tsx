import React from 'react';
import TannHjulIkon from './../tannhjul.svg';
import KnappFss from '../../components/knapp-fss/knapp-fss';

function VeilederVerktoyKnapp (props: {onClick: () => void}) {
    return (
        <KnappFss
            icon={TannHjulIkon}
            onClick={props.onClick}
        >
            Veilederverktøy
        </KnappFss>
    );
}

export default VeilederVerktoyKnapp;
