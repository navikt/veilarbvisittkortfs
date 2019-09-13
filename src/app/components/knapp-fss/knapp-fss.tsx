import * as React  from 'react';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import cls from 'classnames';
import './knapp-fss.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';

interface KnappFssProps extends KnappBaseProps {
    icon?: string;
    iconAlt?: string;
}

const KnappFss: React.FunctionComponent<KnappFssProps> = (props: KnappFssProps) => {
    const { children, className, ...rest } = props;
    return (
        <Knapp className={cls('knapp-fss', className)} {...rest}>
            {children}
        </Knapp>
    );
};

export default withClickMetric(hiddenIf(KnappFss));
