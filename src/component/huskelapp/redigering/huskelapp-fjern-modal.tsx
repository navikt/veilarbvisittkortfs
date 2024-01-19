import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettHuskelapp } from '../../../api/veilarbportefolje';
import {Button, Heading, Modal} from '@navikt/ds-react';
import React from 'react';

function HuskelappFjernModal() {
    const { huskelapp, setHuskelapp } = useDataStore();
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
                    endretAv: null
                })
            )
            .then(hideModal)
            .catch(showErrorModal);
    }

    return (
        <Modal open={true} onClose={hideModal}>
            <Modal.Header>
                <Heading size="medium" as="h1" className="margin-bottom-s">
                    Slett huskelapp
                </Heading>
            </Modal.Header>
            <Modal.Body>
                Huskelappen slettes, men kan utleveres ved innsynsbegjæring innenfor oppfølgingsperioden.
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
