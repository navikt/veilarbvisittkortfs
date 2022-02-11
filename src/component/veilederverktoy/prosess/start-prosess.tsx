import React from 'react';
import withClickMetric, { ClickMetricProps } from '../../components/click-metric/click-metric';
import { MenyKnapp } from '../../components/meny-knapp/meny-knapp';

interface StartProsessProps {
    knappeTekst: string;
    onClick?: () => void;
}

const ProcessKnapp = withClickMetric(MenyKnapp);

function StartProcess(props: StartProsessProps & ClickMetricProps) {
    return (
        <ProcessKnapp onClick={props.onClick} className="btn--mb1" metricName={props.metricName}>
            {props.knappeTekst}
        </ProcessKnapp>
    );
}

export default StartProcess;
