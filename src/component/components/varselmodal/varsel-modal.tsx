import React from 'react';
import './varsel-modal.less';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as SuccessSirkelIkon } from './ok-sirkel.svg';
import classNames from 'classnames';
import Modal from '../modal/modal';

type VarselModalType = 'ADVARSEL' | 'FEIL' | 'SUCCESS';

interface VarselModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    closeTimeoutMS?: number;
    closeButton?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
    type: VarselModalType;
}

export function VarselModal({
    contentLabel,
    isOpen,
    onRequestClose,
    children,
    closeTimeoutMS,
    closeButton,
    shouldCloseOnOverlayClick,
    className,
    type
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <Modal
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            // closeButton={closeButton}
            className="veilarbvisittkortfs-varsel-modal"
            // shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            {getIkon(type)}
            <div className={classNames('modal__innhold', className)}>{children}</div>
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
