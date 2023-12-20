import React from 'react';
import withClickMetric, { ClickMetricProps } from '../../components/click-metric/click-metric';
import { MenyKnapp } from '../../components/meny-knapp/meny-knapp';
import { useAppStore } from '../../../store/app-store';

interface StartProsessProps {
    knappeTekst: string;
    onClick?: () => void;
}

const ProcessKnapp = withClickMetric(MenyKnapp);

function StartProcess(props: StartProsessProps & ClickMetricProps) {
    const { setAvsluttOppfolgingOpptelt } = useAppStore();
    if (props.metricName === 'avslutt_oppfolging') {
        setAvsluttOppfolgingOpptelt(false);
    }
    return (
        <ProcessKnapp onClick={props.onClick} metricName={props.metricName}>
            {props.knappeTekst}
        </ProcessKnapp>
    );
}

export default StartProcess;
