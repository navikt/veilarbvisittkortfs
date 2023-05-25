import React from 'react';
import {Loader} from "@navikt/ds-react";

interface InnholdlasterProps {
    className?: string;
    avhengigheter: boolean[];
    children: React.ReactNode;
}

function Innholdslaster(props: InnholdlasterProps) {
    const visChildren = props.avhengigheter.every(avhengighet => avhengighet);

    if (visChildren) {
        return props.children;
    }

    return <Loader className={props.className || ''} type="XL" />;
}

export default Innholdslaster;
