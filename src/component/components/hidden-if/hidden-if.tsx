import { ComponentType } from 'react';

export interface HiddenProps {
    hidden?: boolean;
}

export default function hiddenIf<PROPS>(Component: ComponentType<PROPS>): ComponentType<PROPS & HiddenProps> {
    return (props: PROPS & HiddenProps) => {
        // eslint-disable-next-line
        const { hidden, ...rest } = props as any; // tslint:disable-line
        if (hidden) {
            return null;
        }
        return <Component {...rest} />;
    };
}
