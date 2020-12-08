import React from 'react';

export interface VisibleProps {
    visible?: any;
}

export default function visibleIf<PROPS>(
    Component: React.ComponentType<PROPS>
): React.ComponentType<PROPS & VisibleProps> {
    return (props: PROPS & VisibleProps) => {
        const { visible, ...rest } = props as any; // tslint:disable-line
        if (visible) {
            return <Component {...rest} />;
        }
        return null;
    };
}
