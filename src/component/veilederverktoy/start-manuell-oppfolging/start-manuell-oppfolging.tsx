import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { settBrukerTilManuell } from '../../../api/veilarboppfolging';

function StartManuellOppfolging() {
    const { brukerFnr } = useAppStore();
    const { innloggetVeileder } = useDataStore();
    const { showStartManuellOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function settBrukerTilManuellOppfolging(values: BegrunnelseValues) {
        showSpinnerModal();
        settBrukerTilManuell(brukerFnr, innloggetVeileder.ident, values.begrunnelse)
            .then(() => {
                // TODO: Oppdater status for oppfølging eller refetch
                showStartManuellOppfolgingKvitteringModal({ begrunnelse: values.begrunnelse });
            })
            .catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={settBrukerTilManuellOppfolging}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren trenger manuell oppfølging"
            isLoading={false}
            tittel="Endre til manuell oppfølging"
            infoTekst={
                <AlertStripeAdvarsel className="blokk-xxs">
                    Når du endrer til manuell oppfølging, har du ikke lenger mulighet til å ha dialog med brukeren i
                    aktivitetsplanen.
                </AlertStripeAdvarsel>
            }
        />
    );
}

export default StartManuellOppfolging;
