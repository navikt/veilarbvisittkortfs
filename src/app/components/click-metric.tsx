import * as React from 'react';
import { logEvent } from '../utils/frontend-logger';

interface ClickMetricProps {
    metricName: string;
    children: React.ReactNode;
}

class ClickMetric extends React.Component<ClickMetricProps> {

    handleClickMetricWrapperClicked = () => {
        logEvent(`veilarbvisittkortfs.metrikker.${this.props.metricName}`);
    }

    render() {

        if (this.props.children == null) {
            return null;
        }

        return (
            <div onClick={this.handleClickMetricWrapperClicked}>
                {this.props.children}
            </div>
        );
    }
}

export default ClickMetric;
