import React from 'react';
import NavFrontendModal from 'nav-frontend-modal';
import ModalContainer from './modal-container';
import './modal.less';

interface ModalProps {
    isOpen: boolean,
    children: React.ReactNode;
    onRequestClose: () => void;
    undertittel?: string;
    innholdstittel: string;

}

function Modal(props: ModalProps) {
    const {isOpen, onRequestClose, ...rest} = props;
    return (
        <NavFrontendModal
            isOpen={isOpen}
            contentLabel="modal"
            onRequestClose={onRequestClose}
            closeButton={true}
        >
            <ModalContainer {...rest}>
                {props.children}
            </ModalContainer>
        </NavFrontendModal>
    );
}


export default Modal;