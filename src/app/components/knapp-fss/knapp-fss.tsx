import * as React  from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { KnappProps } from 'nav-frontend-knapper/lib/knapp';
import cls from 'classnames';
import './knapp-fss.less';

interface KnappFssProps extends KnappProps {
    icon?: string;
    iconAlt?: string;
}

const KnappFss: React.FunctionComponent<KnappFssProps> = (props: KnappFssProps) => {
    const { children, icon, iconAlt, className, ...rest } = props;
    return (
        <Knapp className={cls('knapp-fss', className)} {...rest}>
            {children}
            {icon && <img src={icon} alt={iconAlt} className="knapp-fss__icon"/>}
        </Knapp>
    );
};

export default KnappFss;
