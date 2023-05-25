import React from 'react';
import classNames from 'classnames';
import { Modal as AkselModal } from '@navikt/ds-react';
import './modal.less';

interface ModalProps {
    children: React.ReactNode;
    className?: string;
    contentLabel: string;
    isOpen?: boolean;
    onRequestClose: () => void;
}

function Modal({ children, className, contentLabel, isOpen = true, onRequestClose }: ModalProps) {
    return (
        <AkselModal
            className={classNames('modal', 'visittkortfs-modal', className)}
            // contentLabel={contentLabel}
            open={isOpen}
            onClose={onRequestClose}
            // portalClassName="visittkortfs-modal"
            // closeButton={true}
        >
            {children}
        </AkselModal>
    );
}

export default Modal;
