import React from 'react';
import PT from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import classNames from 'classnames';
import ModalHeader from './modal-header';

function Modal({
    header,
    children,
    isOpen,
    onRequestClose,
    className,
    ...props
}) {
    const closeFuncOrDefault = () => {
        if (onRequestClose) {
            onRequestClose();
            return;
        }
    };
    return (
        <NavFrontendModal
            {...props}
            isOpen={isOpen}
            className={classNames('aktivitet-modal', className)}
            overlayClassName="aktivitet-modal__overlay"
            portalClassName="aktivitetsplanfs aktivitet-modal-portal"
            onRequestClose={closeFuncOrDefault}
        >
            {header}
            {children}
        </NavFrontendModal>
    );
}

Modal.defaultProps = {
    onRequestClose: null,
    className: '',
    header: <ModalHeader />,
    avhengigheter: [],
    minstEnAvhengighet: false,
    feilmeldinger: [],
    isOpen:false,
};

Modal.propTypes = {
    history: PT.object,
    isOpen:PT.bool,
    onRequestClose: PT.func,
    className: PT.string,
    header: PT.node,
    children: PT.node.isRequired,
    avhengigheter: PT.array,
    minstEnAvhengighet: PT.bool,
};

export default Modal;
