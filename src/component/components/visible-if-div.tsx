import { ReactNode } from 'react';
import visibleIf from './visible-if';

function VisibleIfDiv(props: { children: ReactNode; className: string }) {
    return <div {...props}>{props.children}</div>;
}

export default visibleIf(VisibleIfDiv);
