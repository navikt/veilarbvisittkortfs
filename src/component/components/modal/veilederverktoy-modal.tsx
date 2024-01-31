import { ReactNode } from 'react';
import classNames from 'classnames';
import { useModalStore } from '../../../store/modal-store';
import { Modal } from '@navikt/ds-react';

interface VeilederVerktoyModalProps {
    children: ReactNode;
    className?: string;
    tittel: string;
}

function VeilederVerktoyModal(props: VeilederVerktoyModalProps) {
    const { hideModal } = useModalStore();

    return (
        <Modal
            className={classNames('veilederverktoy-modal', props.className)}
            open={true}
            onClose={hideModal}
            header={{
                heading: props.tittel,
                closeButton: true
            }}
        >
            <Modal.Body>{props.children}</Modal.Body>
        </Modal>
    );
}

export default VeilederVerktoyModal;
