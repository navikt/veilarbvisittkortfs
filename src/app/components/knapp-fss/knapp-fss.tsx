import * as React  from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';
import cls from 'classnames';
import './knapp-fss.less';
import withClickMetric from '../click-metric/click-metric';
import hiddenIf from '../hidden-if/hidden-if';

interface KnappFssProps extends KnappProps {
    icon?: string;
    iconAlt?: string;
}

const KnappFss: React.FunctionComponent<KnappFssProps> = (props: KnappFssProps) => {
    const { children, icon, iconAlt, className, ...rest } = props;
    return (
        <Knapp className={cls('knapp-fss', className)} {...rest}>
            {icon && <img src={icon} alt={iconAlt || ''} className="knapp-fss__icon"/>}
            {children}
        </Knapp>
    );
};

export default withClickMetric(hiddenIf(KnappFss));
