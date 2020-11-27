import React from 'react';
import Modal from './modal';
import ModalHeader from './modal-header';
import classNames from 'classnames';
import { useModalStore } from '../../../store/modal-store';

interface VeilederVerktoyModalProps {
    children: React.ReactNode;
    className?: string;
    tittel?: string;
}

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    const { hideModal } = useModalStore();

    return (
        <Modal
            className={classNames('veilederverktoy-modal', props.className)}
            isOpen={true}
            onRequestClose={hideModal}
            contentLabel="veilederverktoy"
        >
            <ModalHeader tittel={props.tittel} />
            <div className="modal-innhold">{props.children}</div>
        </Modal>
    );
}

export default VeilederVerktoyModal;
