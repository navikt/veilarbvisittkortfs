import { Alert, BodyShort, Modal } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useBrukerFnr } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { settBrukerTilDigital, useOppfolging } from '../../../api/veilarboppfolging';
import { useInnloggetVeileder } from '../../../api/veilarbveileder';

function StartDigitalOppfolging() {
    const brukerFnr = useBrukerFnr();
    const { innloggetVeileder } = useInnloggetVeileder();
    const { oppfolging, mutate: refreshOppfolging } = useOppfolging(brukerFnr);
    const { hideModal, showStartDigitalOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function startDigitalOppgfolging(begrunnelseValues: BegrunnelseValues) {
        if (!brukerFnr) return;
        showSpinnerModal();
        settBrukerTilDigital(brukerFnr, innloggetVeileder!.ident, begrunnelseValues.begrunnelse)
            .then(() => {
                refreshOppfolging();
                showStartDigitalOppfolgingKvitteringModal({ begrunnelse: begrunnelseValues.begrunnelse });
            })
            .catch(showErrorModal);
    }

    if (oppfolging?.reservasjonKRR) {
        return (
            <VarselModal type="ADVARSEL" isOpen={true} onRequestClose={hideModal}>
                <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">
                    <BodyShort size="small">
                        Brukeren er reservert i Kontakt- og reservasjonsregisteret og må selv fjerne reservasjonen for å
                        få digital oppfølging.
                    </BodyShort>
                </Modal.Body>
            </VarselModal>
        );
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={startDigitalOppgfolging}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            tittel="Endre til digital oppfølging"
            infoTekst={
                <Alert variant="warning">
                    Når du endrer til digital oppfølging, kan du ha dialog med brukeren i aktivitetsplanen.
                </Alert>
            }
            isLoading={false}
        />
    );
}

export default StartDigitalOppfolging;
