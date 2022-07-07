import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Element, Innholdstittel } from 'nav-frontend-typografi';
import { VarselModal } from '../components/varselmodal/varsel-modal';
import { slettArbeidsliste } from '../../api/veilarbportefolje';
import { useModalStore } from '../../store/modal-store';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectSammensattNavn } from '../../util/selectors';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';

function FjernArbeidslisteModal() {
    const { brukerFnr } = useAppStore();
    const { setArbeidsliste, personalia } = useDataStore();
    const { showSpinnerModal, showErrorModal, hideModal } = useModalStore();

    const brukerSammensattNavn = selectSammensattNavn(personalia);

    function handleSlettArbeidsListe() {
        logMetrikk('visittkort.metrikker.fjern_arbeidsliste');

        showSpinnerModal();

        slettArbeidsliste(brukerFnr).then(ifResponseHasData(setArbeidsliste)).then(hideModal).catch(showErrorModal);
    }

    return (
        <VarselModal contentLabel="Fjern fra arbeidslisten" isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
            <div className="modal-info-tekst blokk-s">
                <Innholdstittel className="modal-info-tekst__overskrift blokk-s">Fjern fra arbeidsliste</Innholdstittel>
                <Element className="blokk-m">{`${brukerSammensattNavn}, ${brukerFnr}`}</Element>
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
