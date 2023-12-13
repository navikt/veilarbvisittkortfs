import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { logMetrikk } from '../../../util/logger';
import { trackAmplitude } from '../../../amplitude/amplitude';
import { slettHuskelapp } from '../../../api/veilarbportefolje';
import { ifResponseHasData } from '../../../util/utils';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Button, Heading } from '@navikt/ds-react';
import React from 'react';

function FjernHuskelappModal() {
    const { huskelapp, setHuskelapp } = useDataStore();
    const { showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    function handleSlettHuskelapp() {
        logMetrikk('visittkort.metrikker.fjern_huskelapp');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Fjern huskelapp', effekt: 'Fjern huskelapp for bruker' }
        });
        showSpinnerModal();

        slettHuskelapp(huskelapp!.huskelappId!)
            .then(
                ifResponseHasData(() =>
                    setHuskelapp({
                        huskelappId: null,
                        frist: null,
                        kommentar: null,
                        endretDato: null,
                        endretAv: null
                    })
                )
            )
            .then(hideModal)
            .catch(showErrorModal);
    }

    return (
        <VarselModal contentLabel="Fjern huskelapp" isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
            <div className="modal-info-tekst blokk-s">
                <Heading size="large" as="h1" className="modal-info-tekst__overskrift blokk-s">
                    Fjern huskelapp
                </Heading>
            </div>
            <div className="knapper">
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

export default FjernHuskelappModal;
