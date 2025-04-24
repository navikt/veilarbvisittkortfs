import { BodyShort, Button, Modal } from '@navikt/ds-react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { selectSammensattNavn } from '../../../util/selectors';
import { useAppStore } from '../../../store/app-store';
import { avsluttOppfolging } from '../../../api/veilarboppfolging';

export interface AvsluttOppfolgingBekreftelseModalProps {
    begrunnelse: string;
}

function AvsluttOppfolgingBekreft({ begrunnelse }: AvsluttOppfolgingBekreftelseModalProps) {
    const { brukerFnr } = useAppStore();
    const { personalia, innloggetVeileder } = useDataStore();
    const { showAvsluttOppfolgingKvitteringModal, showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    const brukerNavn = selectSammensattNavn(personalia);

    function handleSubmitAvsluttOppfolging() {
        showSpinnerModal();

        avsluttOppfolging(brukerFnr, begrunnelse, innloggetVeileder!.ident)
            .then(showAvsluttOppfolgingKvitteringModal)
            .catch(showErrorModal);
    }

    return (
        <VarselModal onRequestClose={hideModal} isOpen={true} type="ADVARSEL" egenBody={true}>
            <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                <BodyShort size="small">
                    Er du sikker på at du vil avslutte oppfølgingsperioden til {brukerNavn}?
                </BodyShort>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="small" type="submit" onClick={handleSubmitAvsluttOppfolging}>
                    Bekreft
                </Button>
                <Button variant="secondary" size="small" onClick={hideModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </VarselModal>
    );
}

export default AvsluttOppfolgingBekreft;
