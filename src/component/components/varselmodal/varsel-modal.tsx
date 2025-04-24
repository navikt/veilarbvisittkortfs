import { PropsWithChildren } from 'react';
import { Modal } from '@navikt/ds-react';
import AdvarselSirkelIkon from './advarsel-sirkel.svg?react';
import FeilSirkelIkon from './feil-sirkel.svg?react';
import SuccessSirkelIkon from './ok-sirkel.svg?react';
import './varsel-modal.less';

type VarselModalType = 'ADVARSEL' | 'FEIL' | 'SUCCESS';

interface VarselModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    type: VarselModalType;
    inkluderIkon?: boolean;
}

export function VarselModal({
    isOpen,
    onRequestClose,
    children,
    type,
    inkluderIkon = true
}: PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            closeOnBackdropClick={true}
            className="veilarbvisittkortfs-varsel-modal"
            aria-label="Varselmodal"
        >
            {inkluderIkon && <Modal.Header>{getIkon(type)}</Modal.Header>}
            {children}
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
