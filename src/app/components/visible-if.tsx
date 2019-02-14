import * as React from 'react';

export interface VisibleProps {
    visible: boolean;
}

export default function visibleIf<PROPS>(Component: React.ComponentType<PROPS>): React.ComponentType<PROPS & VisibleProps> {
    return (props: PROPS & VisibleProps) => {
        const { visible, ...rest } = props as any; // tslint:disable-line
        if (visible) {
            <Component {...rest} />;
        }
        return null;
    };
}