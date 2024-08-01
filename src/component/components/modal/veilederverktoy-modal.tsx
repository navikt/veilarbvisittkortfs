import { ReactNode } from 'react';
import classNames from 'classnames';
import { Modal } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';

interface Props {
    tittel: string;
    children: ReactNode;
    className?: string;
}

function VeilederVerktoyModal({ tittel, children, className }: Props) {
    const { hideModal } = useModalStore();

    return (
        <Modal
            className={classNames('veilederverktoy-modal', className)}
            open={true}
            onClose={hideModal}
            closeOnBackdropClick={true}
            header={{
                heading: tittel,
                closeButton: true
            }}
        >
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    );
}

export default VeilederVerktoyModal;
