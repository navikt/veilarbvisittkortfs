import { Alert, BodyShort, Modal } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { fetchOppfolging, settBrukerTilDigital } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

function StartDigitalOppfolging() {
    const { brukerFnr } = useAppStore();
    const { innloggetVeileder, oppfolging, setOppfolging } = useDataStore();
    const { hideModal, showStartDigitalOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);

    function startDigitalOppgfolging(begrunnelseValues: BegrunnelseValues) {
        showSpinnerModal();
        settBrukerTilDigital(brukerFnr, innloggetVeileder!.ident, begrunnelseValues.begrunnelse)
            .then(() => {
                oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

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
