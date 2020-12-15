import React from 'react';
import cls from 'classnames';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import './meny-knapp.less';

export function MenyKnapp(props: KnappBaseProps) {
    const { children, className, ...rest } = props;
    return (
        <Knapp className={cls('meny-knapp', className)} {...rest}>
            {children}
        </Knapp>
    );
}
