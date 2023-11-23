import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { VarselModal } from '../components/varselmodal/varsel-modal';
import { slettArbeidsliste } from '../../api/veilarbportefolje';
import { useModalStore } from '../../store/modal-store';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectSammensattNavn } from '../../util/selectors';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { BodyShort, Heading } from '@navikt/ds-react';

function FjernArbeidslisteModal() {
    const { brukerFnr } = useAppStore();
    const { setArbeidsliste, personalia } = useDataStore();
    const { showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    function handleSlettArbeidsListe() {
        logMetrikk('visittkort.metrikker.fjern_arbeidsliste');
        trackAmplitude({
            name: 'knapp klikket',
            data: { knapptekst: 'Fjern arbeidsliste', effekt: 'Fjern bruker fra arbeidslista' }
        });
        showSpinnerModal();

        slettArbeidsliste(brukerFnr).then(ifResponseHasData(setArbeidsliste)).then(hideModal).catch(showErrorModal);
    }

    return (
        <VarselModal contentLabel="Fjern fra arbeidslisten" isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
            <div className="modal-info-tekst blokk-s">
                <Heading size="large" as="h1" className="modal-info-tekst__overskrift blokk-s">
                    Fjern fra arbeidsliste
                </Heading>
                <BodyShort
                    size="small"
                    className="blokk-m"
                    weight="semibold"
                >{`${brukerSammensattNavn}, ${brukerFnr}`}</BodyShort>
            </div>
            <div className="knapper">
                <Hovedknapp htmlType="submit" className="btn--mr1" onClick={handleSlettArbeidsListe}>
                    Bekreft
                </Hovedknapp>
                <Knapp htmlType="button" onClick={hideModal}>
                    Avbryt
                </Knapp>
            </div>
        </VarselModal>
    );
}

export default FjernArbeidslisteModal;
