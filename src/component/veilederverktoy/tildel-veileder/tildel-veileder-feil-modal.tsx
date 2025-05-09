import { BodyShort, Heading, Button, Modal } from '@navikt/ds-react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { logMetrikk } from '../../../util/logger';
import { useModalStore } from '../../../store/modal-store';

export function FeilTildelingModal() {
    const { hideModal } = useModalStore();
    const feilTildelingOverskriftId = 'feilmelding-tildel-veileder-overskrift';

    const lukkModal = () => {
        logMetrikk('veilarbvisittkortfs.metrikker.lukk-modal-tildel-veileder');
        hideModal();
    };

    return (
        <VarselModal
            isOpen={true}
            type="FEIL"
            onRequestClose={lukkModal}
            inkluderIkon={false}
            ariaLabelledBy={feilTildelingOverskriftId}
        >
            <Modal.Header>
                <Heading size="medium" level="2" id={feilTildelingOverskriftId}>
                    Handlingen kan ikke utføres
                </Heading>
            </Modal.Header>
            <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                <BodyShort size="small">
                    Tildeling av veileder feilet. Det kan skyldes manglende tilgang til brukeren, at veilederen allerede
                    er tildelt brukeren, eller at brukeren ikke er under oppfølging.
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="small" onClick={lukkModal}>
                    Ok
                </Button>
            </Modal.Footer>
        </VarselModal>
    );
}
