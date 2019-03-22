import * as React from 'react';
import { logEvent } from '../utils/frontend-logger';

interface ClickMetricProps {
    metricName: string;
    children: React.ReactNode;
}

const handleClickMetricWrapperClicked = (metricName: string) => {
    return () => {
        logEvent(`veilarbvisittkortfs.metrikker.${metricName}`);
    };
};

function ClickMetric(props: ClickMetricProps) {

    if (props.children == null) {
        return null;
    }

    return (
        <div onClick={handleClickMetricWrapperClicked(props.metricName)}>
            {props.children}
        </div>
    );
}

export default ClickMetric;
