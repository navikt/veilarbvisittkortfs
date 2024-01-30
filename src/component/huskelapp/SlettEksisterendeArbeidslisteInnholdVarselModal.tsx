import { Button, Heading, Modal } from '@navikt/ds-react';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { slettArbeidsliste } from '../../api/veilarbportefolje';
import { ifResponseHasData } from '../../util/utils';
import { useModalStore } from '../../store/modal-store';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';

interface Props {
    onCloseRequest: () => void;
    isOpen: boolean;
}

export const SlettEksisterendeArbeidslisteInnholdVarselModal = ({ onCloseRequest, isOpen }: Props) => {
    const { brukerFnr } = useAppStore();
    const { setArbeidsliste } = useDataStore();
    const { showErrorModal, showSpinnerModal, hideModal } = useModalStore();

    const handleSlettArbeidsListe = () => {
        logMetrikk('visittkort.metrikker.fjern_arbeidsliste');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Fjern arbeidsliste', effekt: 'Fjern bruker fra arbeidslista' }
        });
        showSpinnerModal();
        slettArbeidsliste(brukerFnr)
            .then(ifResponseHasData(setArbeidsliste))
            .then(onCloseRequest)
            .catch(showErrorModal)
            .then(hideModal);
    };

    return (
        <Modal open={isOpen} onClose={onCloseRequest}>
            <Modal.Header>
                <Heading level="1" size="medium">
                    Slett eksisterende arbeidslisteinnhold
                </Heading>
            </Modal.Header>
            <Modal.Body>Tittel, kommentar og frist slettes for denne brukeren.</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" size="small" type="button" onClick={handleSlettArbeidsListe}>
                    Slett
                </Button>
                <Button variant="secondary" size="small" type="button" onClick={onCloseRequest}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
