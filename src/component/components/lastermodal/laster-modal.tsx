import React from 'react';
import './laster-modal.less';
import { Loader, Modal } from '@navikt/ds-react';

export function LasterModal() {
    return (
        <Modal
            open={true}
            onClose={() => {}} // tslint:disable-line:no-empty
            className="veilarbvisittkortfs-laster-modal"
        >
            <Modal.Body>
                <Loader size="3xlarge" />
            </Modal.Body>
        </Modal>
    );
}
