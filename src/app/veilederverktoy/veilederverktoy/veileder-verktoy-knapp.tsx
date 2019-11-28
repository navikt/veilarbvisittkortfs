import React from 'react';
import { ReactComponent as TannHjulIkon } from './../tannhjul.svg';
import KnappFss from '../../components/knapp-fss/knapp-fss';

function VeilederVerktoyKnapp(props: { onClick: () => void }) {
    return (
        <KnappFss metricName="veileder-verktoy-trykket" onClick={props.onClick}>
            <TannHjulIkon className="knapp-fss__icon" />
            <span> Veilederverktøy </span>
        </KnappFss>
    );
}

export default VeilederVerktoyKnapp;
