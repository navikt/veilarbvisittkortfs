import React, { MouseEvent } from 'react';
import { useModalStore } from '../../../store/modal-store';
import {Link} from "@navikt/ds-react";

interface Props {
    brukerFnr: string;
    dialogId?: number;
    className?: string;
    children: React.ReactNode;
}

function LenkeTilDialog({ brukerFnr, dialogId, className, children }: Props) {
    const { hideModal } = useModalStore();

    const dialogLenke = dialogId
        ? `/veilarbpersonflatefs/${brukerFnr}/${dialogId}/#visDialog`
        : `/veilarbpersonflatefs/${brukerFnr}`;

    const gaaTilDialog = (event: MouseEvent) => {
        event.preventDefault();
        window.history.pushState('', 'Dialog', dialogLenke);
        window.dispatchEvent(
            new CustomEvent('visDialog', {
                detail: {
                    dialogId: dialogId
                }
            })
        );
        hideModal();
    };

    return (
        <Link href={dialogLenke} onClick={gaaTilDialog} className={className}>
            {children}
        </Link>
    );
}

export default LenkeTilDialog;
