import { ComponentType } from 'react';

export interface VisibleProps {
    visible?: any;
}

export default function visibleIf<PROPS>(Component: ComponentType<PROPS>): ComponentType<PROPS & VisibleProps> {
    return (props: PROPS & VisibleProps) => {
        const { visible, ...rest } = props as any;
        if (visible) {
            return <Component {...rest} />;
        }
        return null;
    };
}
