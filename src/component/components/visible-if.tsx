import { ComponentType } from 'react';

export interface VisibleProps {
    // eslint-disable-next-line
    visible?: any;
}

export default function visibleIf<PROPS>(Component: ComponentType<PROPS>): ComponentType<PROPS & VisibleProps> {
    return (props: PROPS & VisibleProps) => {
        // eslint-disable-next-line
        const { visible, ...rest } = props as any; // tslint:disable-line
        if (visible) {
            return <Component {...rest} />;
        }
        return null;
    };
}
