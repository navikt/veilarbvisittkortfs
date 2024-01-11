import React from 'react';
import './varsel-modal.less';
import AdvarselSirkelIkon from './advarsel-sirkel.svg?react';
import FeilSirkelIkon from './feil-sirkel.svg?react';
import SuccessSirkelIkon from './ok-sirkel.svg?react';
import { Modal } from '@navikt/ds-react';

type VarselModalType = 'ADVARSEL' | 'FEIL' | 'SUCCESS';

interface VarselModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    className?: string;
    type: VarselModalType;
}

export function VarselModal({
    isOpen,
    onRequestClose,
    children,
    className,
    type
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            className="veilarbvisittkortfs-varsel-modal"
            closeOnBackdropClick={true}
            width="576px"
        >
            <Modal.Header>{getIkon(type)}</Modal.Header>
            <Modal.Body>
                <div className={className}>{children}</div>
            </Modal.Body>
        </Modal>
    );
}

function getIkon(type: VarselModalType) {
    switch (type) {
        case 'ADVARSEL':
            return <AdvarselSirkelIkon />;
        case 'FEIL':
            return <FeilSirkelIkon />;
        case 'SUCCESS':
            return <SuccessSirkelIkon />;
        default:
            return null;
    }
}
