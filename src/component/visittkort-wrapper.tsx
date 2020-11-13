import React, { PropsWithChildren } from 'react';

function VisittkortWrapper(props: PropsWithChildren<{}>) {
    return <div className="visittkortfs">{props.children}</div>;
}

export default VisittkortWrapper;
