import React from 'react';
import visibleIf from "./visible-if";

function VisibleIfDiv(props: {children: React.ReactNode, className: string}) {
    return (
        <div {...props}>
            {props.children}
        </div>
    );
}


export default visibleIf(VisibleIfDiv);