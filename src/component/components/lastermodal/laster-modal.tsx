import React from 'react';
import './laster-modal.less';
import { Loader, Modal } from '@navikt/ds-react';
import classNames from 'classnames';

export function LasterModal() {
    return (
        <Modal
            open={true}
            // contentLabel="Laster data"
            onClose={() => {}} // tslint:disable-line:no-empty
            closeButton={false}
            // portalClassName="veilarbvisittkortfs-laster-modal"
            className={classNames('visittkortfs-modal__laster-modal')}
        >
            <Loader size="2xlarge" />
        </Modal>
    );
}
