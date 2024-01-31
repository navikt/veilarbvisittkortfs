import { FunctionComponent } from 'react';
import { Button, ButtonProps } from '@navikt/ds-react';
import cls from 'classnames';
import './knapp-fss.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';

const KnappFss: FunctionComponent<ButtonProps> = props => {
    const { children, className, ...rest } = props;
    return (
        <Button variant="tertiary" className={cls('knapp-fss', className)} {...rest}>
            {children}
        </Button>
    );
};

export default withClickMetric(hiddenIf(KnappFss));
