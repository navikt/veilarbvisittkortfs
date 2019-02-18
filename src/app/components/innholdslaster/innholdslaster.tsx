import React from 'react';
import Spinner from 'nav-frontend-spinner';

interface InnholdlasterProps {
    className?: string;
    avhengigheter: boolean[];
    children: React.ReactNode
}

function Innholdslaster(props: InnholdlasterProps) {
    const visChildren = props.avhengigheter.every(avhengighet=> avhengighet);

    if (visChildren) {
        return props.children;
    }

    return (
        <Spinner
            className={props.className || ''}
            type="XL"
        />
    );
}

export default Innholdslaster;