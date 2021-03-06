import React from 'react';
import ModalWrapper from 'nav-frontend-modal';
import './varsel-modal.less';
import { ReactComponent as AdvarselSirkelIkon } from './advarsel-sirkel.svg';
import { ReactComponent as FeilSirkelIkon } from './feil-sirkel.svg';
import { ReactComponent as SuccessSirkelIkon } from './ok-sirkel.svg';
import classNames from 'classnames';

type VarselModalType = 'ADVARSEL' | 'FEIL' | 'SUCCESS';

interface VarselModalProps {
    contentLabel: string;
    isOpen: boolean;
    onRequestClose: () => void;
    closeTimeoutMS?: number;
    closeButton?: boolean;
    shouldCloseOnOverlayClick?: boolean;
    className?: string;
    type: VarselModalType;
}

export function VarselModal({
    contentLabel,
    isOpen,
    onRequestClose,
    children,
    closeTimeoutMS,
    closeButton,
    shouldCloseOnOverlayClick,
    className,
    type,
}: React.PropsWithChildren<VarselModalProps>) {
    return (
        <ModalWrapper
            isOpen={isOpen}
            contentLabel={contentLabel}
            onRequestClose={onRequestClose}
            closeTimeoutMS={closeTimeoutMS}
            closeButton={closeButton}
            portalClassName="veilarbvisittkortfs-varsel-modal"
            shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        >
            {getIkon(type)}
            <div className={classNames('modal__innhold', className)}>{children}</div>
        </ModalWrapper>
    );
}

function getIkon(type: VarselModalType) {
    switch (type) {
        case 'ADVARSEL':
            return <AdvarselSirkelIkon />;
        case 'FEIL':
            return <FeilSirkelIkon />;
        case 'SUCCESS':
            return <SuccessSirkelIkon />;
        default:
            return null;
    }
}
