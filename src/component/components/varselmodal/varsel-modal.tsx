import { PropsWithChildren } from 'react';
import './varsel-modal.less';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as SuccessSirkelIkon } from './ok-sirkel.svg';
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
}: PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            className="veilarbvisittkortfs-varsel-modal"
        >
            <Modal.Header>{getIkon(type)}</Modal.Header>
            <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
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
