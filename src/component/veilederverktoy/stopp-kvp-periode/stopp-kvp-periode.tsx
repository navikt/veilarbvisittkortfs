import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { useAppStore } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { fetchOppfolging, stoppKvpOppfolging } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useDataStore } from '../../../store/data-store';
import { BodyShort } from '@navikt/ds-react';

const initialValues = { begrunnelse: '' };

function StoppKvpPeriode() {
    const { brukerFnr } = useAppStore();
    const { setOppfolging } = useDataStore();
    const { showStoppKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    const infoTekst = (
        <BodyShort size="small">
            KVP-perioden til brukeren er avsluttet. Veiledere i andre enheter har nå tilgang til dialoger, aktiviteter
            og mål som er opprettet før og etter KVP-perioden.
        </BodyShort>
    );

    function stoppKvp({ begrunnelse }: BegrunnelseValues) {
        showSpinnerModal();

        stoppKvpOppfolging(brukerFnr, begrunnelse)
            .then(() => {
                fetchOppfolging(brukerFnr)
                    .then(ifResponseHasData(setOppfolging))
                    .then(showStoppKvpPeriodeKvitteringModal)
                    .catch(showErrorModal);
            })
            .catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={stoppKvp}
            tekstariaLabel="Begrunnelse:"
            tittel="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={infoTekst}
            isLoading={false}
            maxLength={250}
        />
    );
}

export default StoppKvpPeriode;
