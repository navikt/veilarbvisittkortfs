import { ReactNode } from 'react';
import { BodyShort, Heading, Modal } from '@navikt/ds-react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';

interface KvitteringProps {
    tittel: string;
    alertStripeTekst: string;
    annetInnhold?: ReactNode;
    onRequestClose?: () => void;
}

function Kvittering({ tittel, alertStripeTekst, annetInnhold, onRequestClose }: KvitteringProps) {
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
            <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                <Heading size="medium" level="2" className="modal-info-tekst__undertekst">
                    {tittel}
                </Heading>
                <BodyShort size="small" spacing={true}>
                    {alertStripeTekst}
                </BodyShort>
                {annetInnhold}
            </Modal.Body>
        </VarselModal>
    );
}

export default Kvittering;
