import React from 'react';
import TannHjulIkon from './../tannhjul.svg';
import KnappFss from '../../components/knapp-fss/knapp-fss';
import ClickMetric from '../../components/click-metric';

function VeilederVerktoyKnapp (props: {onClick: () => void}) {
    return (
        <ClickMetric metricName="veileder-verktoy-trykket">
            <KnappFss
                icon={TannHjulIkon}
                onClick={props.onClick}
            >
                Veilederverktøy
            </KnappFss>
        </ClickMetric>
    );
}

export default VeilederVerktoyKnapp;
