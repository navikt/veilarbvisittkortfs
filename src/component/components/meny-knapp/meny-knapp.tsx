import React from 'react';
import cls from 'classnames';
import './meny-knapp.less';
import { ButtonProps } from '@navikt/ds-react';

export function MenyKnapp(props: ButtonProps) {
    const { children, className, ...rest } = props;
    return (
        <div className={cls('meny-knapp', className)} {...rest}>
            {children}
        </div>
    );
}
