import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { stoppKvpOppfolging } from '../../../api/veilarboppfolging';

function StoppKvpPeriode() {
    const { brukerFnr } = useAppStore();
    const { showStoppKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    const infoTekst = (
        <Normaltekst className="blokk-xs">
            KVP-perioden til brukeren er avsluttet. Veiledere i andre enheter har nå tilgang til dialoger, aktiviteter
            og mål som er opprettet før og etter KVP-perioden.
        </Normaltekst>
    );

    const initialValues = { begrunnelse: '' };

    function stoppKvp({ begrunnelse }: BegrunnelseValues) {
        showSpinnerModal();

        stoppKvpOppfolging(brukerFnr, begrunnelse).then(showStoppKvpPeriodeKvitteringModal).catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={stoppKvp}
            tekstariaLabel="Begrunnelse:"
            tittel="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={infoTekst}
            isLoading={false} // TODO: ta bort
            maxLength={250}
        />
    );
}

export default StoppKvpPeriode;
