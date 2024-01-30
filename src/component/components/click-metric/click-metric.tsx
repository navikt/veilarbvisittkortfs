import { ComponentType } from 'react';
import { logMetrikk } from '../../../util/logger';

export interface ClickMetricProps {
    metricName?: string;
    tags?: {};
    fields?: {};
}

export interface OnClickProps {
    onClick?: (event?: any) => void;
}

const handleClickMetricWrapperClicked = (
    metricName?: string,
    tags?: any,
    fields?: any,
    onClick?: (event?: any) => void
) => {
    return (event?: any) => {
        if (metricName) {
            logMetrikk(`veilarbvisittkortfs.metrikker.${metricName}`, fields, tags);
        }

        if (onClick) {
            onClick(event);
        }
    };
};

export default function withClickMetric<PROPS extends OnClickProps>(
    Component: ComponentType<PROPS>
): ComponentType<PROPS & ClickMetricProps> {
    return (props: PROPS & ClickMetricProps) => {
        const { onClick, metricName, tags, fields, ...rest } = props as any; // tslint:disable-line
        return <Component onClick={handleClickMetricWrapperClicked(metricName, tags, fields, onClick)} {...rest} />;
    };
}
