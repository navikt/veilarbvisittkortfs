import NavFrontendModal from 'nav-frontend-modal';
import React from 'react';
import classNames from 'classnames';
import './modal.less';

const cls = (className: string) => classNames('modal', className);

interface ModalProps {
    children: React.ReactNode;
    className: string;
    contentLabel: string;
    isOpen?: boolean;
    onRequestClose: () => void;
}

function Modal({ children, className, contentLabel, isOpen = true, onRequestClose }: ModalProps) {
    return (
        <NavFrontendModal
            className={cls(className)}
            contentLabel={contentLabel}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            portalClassName="visittkortfs-modal"
            closeButton={true}
        >
            {children}
        </NavFrontendModal>
    );
}

export default Modal;
