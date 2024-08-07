import { ReactNode } from 'react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { BodyShort, Heading } from '@navikt/ds-react';

interface KvitteringProps {
    tittel: string;
    alertStripeTekst: string;
    footer?: ReactNode;
    onRequestClose?: () => void;
}

function Kvittering({ tittel, alertStripeTekst, footer, onRequestClose }: KvitteringProps) {
    const { hideModal } = useModalStore();

    return (
        <VarselModal
            isOpen={true}
            onRequestClose={() => {
                hideModal();
                if (onRequestClose) {
                    onRequestClose();
                }
            }}
            type="SUCCESS"
        >
            <Heading size="medium" level="2" className="modal-info-tekst__undertekst">
                {tittel}
            </Heading>
            <BodyShort size="small" spacing={true}>
                {alertStripeTekst}
            </BodyShort>
            {footer}
        </VarselModal>
    );
}

export default Kvittering;
