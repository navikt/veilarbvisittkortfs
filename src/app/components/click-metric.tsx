import * as React from 'react';
import { logEvent } from '../utils/frontend-logger';

export interface ClickMetricProps {
   metricName?: string;
}

export interface OnClickProps {
    onClick?: (event?: any) => void;
}

const handleClickMetricWrapperClicked = (metricName?: string, onClick?: (event?: any) => void) => {
    return (event?: any) => {
        console.log("Clicked"); // tslint:disable-line

        if (metricName) {
            logEvent(`veilarbvisittkortfs.metrikker.${metricName}`);
        }

        if (onClick) {
            onClick(event);
        }
    };
};

export default function withClickMetric<PROPS extends OnClickProps>(Component: React.ComponentType<PROPS>): React.ComponentType<PROPS & ClickMetricProps> {
    return (props: PROPS & ClickMetricProps) => {
        const { onClick, metricName, ...rest } = props as any; // tslint:disable-line
        return <Component onClick={handleClickMetricWrapperClicked(metricName, onClick)} {...rest} />;
    };
}
