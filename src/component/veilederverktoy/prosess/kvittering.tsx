import React from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store-midlertidig/modal-store';

interface KvitteringProps {
    tittel: string;
    alertStripeTekst: string;
    footer?: React.ReactNode;
    onRequestClose?: () => void;
}

function Kvittering({ tittel, alertStripeTekst, footer, onRequestClose }: KvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal
            isOpen={true}
            contentLabel="Vedlykkad operation"
            onRequestClose={() => {
                hideModal();
                if (onRequestClose) {
                    onRequestClose();
                }
            }}
            type="SUCCESS"
        >
            <div className="blokk-xs">
                <Systemtittel className="modal-info-tekst__undertekst blokk-xs">{tittel}</Systemtittel>
                <Normaltekst className="blokk-xs">{alertStripeTekst}</Normaltekst>
                {!!footer && <div className="kvittering-footer">{footer}</div>}
            </div>
        </VarselModal>
    );
}

export default Kvittering;
