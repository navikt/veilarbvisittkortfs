import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettHuskelapp, useHuskelapp } from '../../../api/veilarbportefolje';
import { Button, Heading, Modal } from '@navikt/ds-react';
import { useAppStore } from '../../../store/app-store';

function HuskelappFjernModal() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { data: huskelapp, mutate: setHuskelapp } = useHuskelapp(brukerFnr, visVeilederVerktoy);
    const { showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    function handleSlettHuskelapp() {
        logMetrikk('visittkort.metrikker.fjern_huskelapp');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Arkivere huskelapp', effekt: 'Arkivere huskelapp for bruker' }
        });
        showSpinnerModal();

        slettHuskelapp(huskelapp!.huskelappId!)
            .then(() =>
                setHuskelapp({
                    huskelappId: null,
                    frist: null,
                    kommentar: null,
                    endretDato: null,
                    endretAv: null,
                    enhetId: null
                })
            )
            .then(hideModal)
            .catch(showErrorModal);
    }

    return (
        <Modal
            open={true}
            onClose={hideModal}
            closeOnBackdropClick={true}
            width="small"
            aria-label="Slett huskelapp-modal"
        >
            <Modal.Header>
                <Heading size="medium" level="1">
                    Slett huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body>
                Huskelappen slettes, men kan utleveres hvis personen ber om innsyn i løpet av denne oppfølgingsperioden.
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="primary"
                    size="small"
                    type="button"
                    className="btn--mr1"
                    onClick={handleSlettHuskelapp}
                >
                    Slett
                </Button>
                <Button variant="secondary" size="small" type="button" onClick={hideModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default HuskelappFjernModal;
