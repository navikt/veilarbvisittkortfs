import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettHuskelapp } from '../../../api/veilarbportefolje';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Button, Heading } from '@navikt/ds-react';
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
        <VarselModal isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
            <Heading size="large" as="h1" className="margin-bottom-s">
                Marker huskelapp som ferdig
            </Heading>
            <div className="modal-footer">
                <Button
                    variant="primary"
                    size="small"
                    type="submit"
                    className="btn--mr1"
                    onClick={handleSlettHuskelapp}
                >
                    Bekreft
                </Button>
                <Button variant="secondary" size="small" type="button" onClick={hideModal}>
                    Avbryt
                </Button>
            </div>
        </VarselModal>
    );
}

export default HuskelappFjernModal;
