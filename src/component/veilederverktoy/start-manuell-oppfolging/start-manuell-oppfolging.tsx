import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { fetchOppfolging, settBrukerTilManuell } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';

function StartManuellOppfolging() {
    const { brukerFnr } = useAppStore();
    const { innloggetVeileder, setOppfolging } = useDataStore();
    const { showStartManuellOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();
    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);

    function settBrukerTilManuellOppfolging(values: BegrunnelseValues) {
        showSpinnerModal();
        settBrukerTilManuell(brukerFnr, innloggetVeileder!.ident, values.begrunnelse)
            .then(() => {
                oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

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
            formId="manuell-oppfolging-form"
            infoTekst={
                <AlertStripeAdvarsel className="blokk-xxs" data-testid="manuell-oppfolging-infotekst">
                    Når du endrer til manuell oppfølging, har du ikke lenger mulighet til å ha dialog med brukeren i
                    aktivitetsplanen.
                </AlertStripeAdvarsel>
            }
        />
    );
}

export default StartManuellOppfolging;
