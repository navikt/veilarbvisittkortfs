import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './laster-modal.less';
import { Loader } from '@navikt/ds-react';

export function LasterModal() {
    return (
        <ModalWrapper
            isOpen={true}
            contentLabel="Laster data"
            onRequestClose={() => {}} // tslint:disable-line:no-empty
            closeButton={false}
            portalClassName="veilarbvisittkortfs-laster-modal"
        >
            <Loader size="3xlarge" />
        </ModalWrapper>
    );
}
