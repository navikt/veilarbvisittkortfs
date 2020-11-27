import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { settBrukerTilDigital } from '../../../api/api';

function StartDigitalOppfolging() {
    const { brukerFnr } = useAppStore();
    const { innloggetVeileder, oppfolging } = useDataStore();
    const { hideModal, showStartDigitalOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function startDigitalOppgfolging(begrunnelseValues: BegrunnelseValues) {
        showSpinnerModal();
        settBrukerTilDigital(brukerFnr, innloggetVeileder.ident, begrunnelseValues.begrunnelse)
            .then(() => {
                // TODO: Oppdater status for oppfølging eller refetch
                showStartDigitalOppfolgingKvitteringModal({ begrunnelse: begrunnelseValues.begrunnelse });
            })
            .catch(showErrorModal);
    }

    if (oppfolging.reservasjonKRR) {
        return (
            <VarselModal
                type="ADVARSEL"
                contentLabel="Brukeren er reservert i KRR"
                isOpen={true}
                onRequestClose={hideModal}
            >
                <Normaltekst>
                    Brukeren er reservert i Kontakt- og reservasjonsregisteret og må selv fjerne reservasjonen for å få
                    digital oppfølging.
                </Normaltekst>
            </VarselModal>
        );
    }

    const infoTekst = (
        <AlertStripeAdvarsel className="blokk-xxs">
            Når du endrer til digital oppfølging, kan du ha dialog med brukeren i aktivitetsplanen.
        </AlertStripeAdvarsel>
    );

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={startDigitalOppgfolging}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            tittel="Endre til digital oppfølging"
            infoTekst={infoTekst}
            isLoading={false}
        />
    );
}

export default StartDigitalOppfolging;
