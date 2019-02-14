import React from 'react';
import PT from 'prop-types';
import NavFrontendModal from 'nav-frontend-modal';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import ModalHeader from './modal-header';
import './modal.less'

function Modal({
    header,
    children,
    avhengigheter,
    onRequestClose,
    className,
    minstEnAvhengighet,
    history,
    feilmeldinger,
    ...props
}) {
    const closeFuncOrDefault = () => {
        if (onRequestClose) {
            onRequestClose();
            return;
        }

        history.push('/');
    };
    return (
        <NavFrontendModal
            {...props}
            isOpen
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
};

Modal.propTypes = {
    history: PT.object,
    onRequestClose: PT.func,
    className: PT.string,
    header: PT.node,
    feilmeldinger: PT.array,
    children: PT.node.isRequired,
    avhengigheter: PT.array,
    minstEnAvhengighet: PT.bool,
};

export default withRouter(Modal);
