import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { Normaltekst } from 'nav-frontend-typografi';
import { useModalStore } from '../../../store/modal-store';
import { useAppStore } from '../../../store/app-store';
import { startKvpOppfolging } from '../../../api/veilarboppfolging';

function StarKvpPeriode() {
    const { brukerFnr } = useAppStore();
    const { showStartKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function startKvp({ begrunnelse }: BegrunnelseValues) {
        showSpinnerModal();

        startKvpOppfolging(brukerFnr, begrunnelse).then(showStartKvpPeriodeKvitteringModal).catch(showErrorModal);
    }

    const infoTekst = (
        <Normaltekst className="blokk-xs">
            Når du klikker «Bekreft» vil bare veiledere i din enhet ha tilgang på dialoger, aktiviteter og mål som blir
            opprettet i KVP-perioden. Du må skrive en kommentar før du bekrefter.
        </Normaltekst>
    );

    const initialValues = { begrunnelse: '' };

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={startKvp}
            tekstariaLabel="Begrunnelse:"
            tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={infoTekst}
            isLoading={false} // TODO ta bort
            maxLength={250}
        />
    );
}

export default StarKvpPeriode;
