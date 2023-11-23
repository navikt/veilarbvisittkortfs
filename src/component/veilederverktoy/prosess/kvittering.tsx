import React from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Heading } from '@navikt/ds-react';

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
                <Heading size="medium" as="h2" className="modal-info-tekst__undertekst blokk-xs">
                    {tittel}
                </Heading>
                <BodyShort className="blokk-xs" size="small">
                    {alertStripeTekst}
                </BodyShort>
                {!!footer && <BodyShort size="medium">{footer}</BodyShort>}
            </div>
        </VarselModal>
    );
}

export default Kvittering;
