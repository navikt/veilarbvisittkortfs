import React from 'react';
import classNames from 'classnames';
import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { HiddenIfKnapp } from '../../../components/hidden-if/hidden-if-knapp';
import withClickMetric, { ClickMetricProps } from '../../../components/click-metric/click-metric';

interface StartProsessProps {
    tittelId: string;
    knappetekstId: string;
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    hiddenKnapp?: boolean;

}

const ProcessKnapp = withClickMetric(HiddenIfKnapp);

function StartProcess(props: StartProsessProps & ClickMetricProps) {
    return (
        <article className={classNames('prosess gra-border', props.className)}>
            <Undertittel className="prosess_overskrift">
                <FormattedMessage id={props.tittelId} />
            </Undertittel>
            {props.children}
            <ProcessKnapp
                onClick={props.onClick}
                aria-labelledby={props.tittelId}
                hidden={props.hiddenKnapp}
                className="btn--mb1"
                metricName={props.metricName}
            >
                <FormattedMessage id={props.knappetekstId}/>
            </ProcessKnapp>
        </article>
    );
}

export default StartProcess;
