import React from 'react';
import './knapp-fss.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';
import { Button, ButtonProps } from '@navikt/ds-react';

const KnappFss: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const { children, className, ...rest } = props;
    return (
        <Button variant="tertiary-neutral" size="xsmall" className="knapp-fss" {...rest}>
            {children}
        </Button>
    );
};

export default withClickMetric(hiddenIf(KnappFss));
