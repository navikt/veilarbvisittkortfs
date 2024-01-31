import cls from 'classnames';
import './meny-knapp.less';
import { Button, ButtonProps } from '@navikt/ds-react';

export function MenyKnapp(props: ButtonProps) {
    const { children, className, ...rest } = props;
    return (
        <Button variant="tertiary" className={cls('meny-knapp', className)} {...rest}>
            {children}
        </Button>
    );
}
