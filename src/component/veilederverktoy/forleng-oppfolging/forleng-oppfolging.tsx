import { Modal, VStack } from '@navikt/ds-react';
import { useModalStore } from '../../../store/modal-store';
import './forleng-oppfolging.less';

function ForlengOppfolging({ brukerFnr }: { brukerFnr: string }) {
    const { hideModal } = useModalStore();
    void brukerFnr;

    // TODO: Bruk brukerFnr med useOppfolging når tilgangs- og submitlogikk aktiveres.
    // const { oppfolging } = useOppfolging(brukerFnr);
    // TODO: Bruk mockForlengEtiketter og mockForlengHistorikk når etiketter/historikk vises i modalen.
    // const tilgangTilBrukersKontor = oppfolging
    //     ? oppfolging.harVeilederLeseTilgangTilBruker && oppfolging.harVeilederLeseTilgangTilBrukersEnhet
    //     : false;

    // TODO: Bruk kanForlengeOppfolging når knapp/submit legges til i UI.
    // const kanForlengeOppfolging = selectKanForlengeOppfolging(oppfolging, tilgangTilBrukersKontor);
    // TODO: Koble submit til API-kall og lukk modal med hideModal() når backend-endepunktet er klart.

    return (
        <Modal
            open
            onClose={hideModal}
            header={{
                heading: 'Forleng arbeidsrettet oppfølging'
            }}
            className="forleng-oppfolging-modal"
        >
            <Modal.Body className="forleng-oppfolging-modal__body">
                <VStack></VStack>
            </Modal.Body>
        </Modal>
    );
}

export default ForlengOppfolging;
