import { ReactNode } from 'react';
import hiddenIf from './hidden-if';

function HiddenIfDiv(props: { children: ReactNode; className?: string }) {
    return <div className={props.className}>{props.children}</div>;
}

export default hiddenIf(HiddenIfDiv);
