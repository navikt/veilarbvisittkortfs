import React, { MouseEvent } from 'react';
import Lenke from 'nav-frontend-lenker';

interface Props {
    brukerFnr: string;
    dialogId?: number;
    className?: string;
    children: React.ReactNode;
}

function LenkeTilDialog({ brukerFnr, dialogId, className, children }: Props) {
    const dialogLenke = dialogId
        ? `/veilarbpersonflatefs/${brukerFnr}/${dialogId}`
        : `/veilarbpersonflatefs/${brukerFnr}`;

    const onClick = (event: MouseEvent) => {
        event.preventDefault();
        window.history.pushState('', 'Dialog', dialogLenke);
        window.dispatchEvent(
            new CustomEvent('visDialog', {
                detail: {
                    dialogId: dialogId
                }
            })
        );
    };

    return (
        <Lenke href={dialogLenke} onClick={onClick} className={className}>
            {children}
        </Lenke>
    );
}

export default LenkeTilDialog;
