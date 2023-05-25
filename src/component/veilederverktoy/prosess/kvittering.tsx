import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import {Ingress, BodyShort} from "@navikt/ds-react";

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
            contentLabel="Operasjon fullført"
            onRequestClose={() => {
                hideModal();
                if (onRequestClose) {
                    onRequestClose();
                }
            }}
            type="SUCCESS"
        >
            <div className="blokk-xs">
                <Ingress className="modal-info-tekst__undertekst blokk-xs">{tittel}</Ingress>
                <BodyShort className="blokk-xs">{alertStripeTekst}</BodyShort>
                {!!footer && <div className="kvittering-footer">{footer}</div>}
            </div>
        </VarselModal>
    );
}

export default Kvittering;
