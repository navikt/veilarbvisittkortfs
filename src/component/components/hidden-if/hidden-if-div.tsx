import * as React from 'react';
import hiddenIf from './hidden-if';

function HiddenIfDiv(props: { children: React.ReactNode; className?: string }) {
    return <div className={props.className}>{props.children}</div>;
}

export default hiddenIf(HiddenIfDiv);
