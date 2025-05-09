import { PropsWithChildren } from 'react';
import { Modal } from '@navikt/ds-react';
import AdvarselSirkelIkon from './advarsel-sirkel.svg?react';
import FeilSirkelIkon from './feil-sirkel.svg?react';
import SuccessSirkelIkon from './ok-sirkel.svg?react';
import './varsel-modal.less';

type VarselModalType = 'ADVARSEL' | 'FEIL' | 'SUCCESS';

interface VarselModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    type: VarselModalType;
    inkluderIkon?: boolean;
    /* ID-en til overskrifta til modalen som blir sendt inn i children */
    ariaLabelledBy?: string;
}

export function VarselModal({
    isOpen,
    onRequestClose,
    children,
    type,
    inkluderIkon = true,
    ariaLabelledBy
}: PropsWithChildren<VarselModalProps>) {
    // {...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : { 'aria-label': 'Varselmodal' })} //  Bruk aria-labelledby om vi har det, ellers bruk aria-label. Guide: https://medium.com/frontend-colony/how-to-conditionally-pass-props-to-a-react-component-725abb6da80d
    return (
        <Modal
            open={isOpen}
            onClose={onRequestClose}
            closeOnBackdropClick={true}
            className="veilarbvisittkortfs-varsel-modal"
            aria-labelledby={ariaLabelledBy || 'overskrift-for-skjermleser'}
        >
            {!ariaLabelledBy && (
                <Modal.Header className="navds-sr-only" id="overskrift-for-skjermleser">
                    Varselmodal
                </Modal.Header>
            )}
            {inkluderIkon && <div className="varsel-modal-ikon">{getIkon(type)}</div>}
            {children}
        </Modal>
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
