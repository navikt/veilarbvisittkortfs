import React from 'react';
import cls from 'classnames';
import './knapp-fss.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';
import { Button, ButtonProps } from '@navikt/ds-react';

const KnappFss: React.FunctionComponent<ButtonProps> = (props: ButtonProps) => {
    const { children, className, ...rest } = props;
    return (
        <Button className={cls('knapp-fss', className)} {...rest}>
            {children}
        </Button>
    );
};

export default withClickMetric(hiddenIf(KnappFss));
