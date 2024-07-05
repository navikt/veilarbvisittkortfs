import { VarselModal } from '../components/varselmodal/varsel-modal';
import { slettArbeidsliste, useArbeidsliste } from '../../api/veilarbportefolje';
import { useModalStore } from '../../store/modal-store';
import { useAppStore } from '../../store/app-store';
import { useDataStore } from '../../store/data-store';
import { selectSammensattNavn } from '../../util/selectors';
import { ifResponseHasData } from '../../util/utils';
import { logMetrikk } from '../../util/logger';
import { trackAmplitude } from '../../amplitude/amplitude';
import { BodyShort, Heading, Button } from '@navikt/ds-react';

function FjernArbeidslisteModal() {
    const { brukerFnr, visVeilederVerktoy } = useAppStore();
    const { personalia } = useDataStore();
    const { mutate: setArbeidsliste } = useArbeidsliste(brukerFnr, visVeilederVerktoy);

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
        <VarselModal isOpen={true} onRequestClose={hideModal} type="ADVARSEL">
            <Heading size="large" level="1">
                Fjern fra arbeidsliste
            </Heading>
            <BodyShort size="small" weight="semibold">{`${brukerSammensattNavn}, ${brukerFnr}`}</BodyShort>
            <div className="modal-footer">
                <Button variant="primary" size="small" type="submit" onClick={handleSlettArbeidsListe}>
                    Bekreft
                </Button>
                <Button variant="secondary" size="small" type="button" onClick={hideModal}>
                    Avbryt
                </Button>
            </div>
        </VarselModal>
    );
}

export default FjernArbeidslisteModal;
