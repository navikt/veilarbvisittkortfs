import { BodyShort } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { useModalStore } from '../../../store/modal-store';
import { useBrukerFnr } from '../../../store/app-store';
import { fetchOppfolging, startKvpOppfolging } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useDataStore } from '../../../store/data-store';

function StarKvpPeriode() {
    const brukerFnr = useBrukerFnr();
    const { setOppfolging } = useDataStore();
    const { showStartKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function startKvp({ begrunnelse }: BegrunnelseValues) {
        if (!brukerFnr) return;
        showSpinnerModal();
        startKvpOppfolging(brukerFnr, begrunnelse)
            .then(() => {
                fetchOppfolging(brukerFnr)
                    .then(ifResponseHasData(setOppfolging))
                    .then(showStartKvpPeriodeKvitteringModal)
                    .catch(showErrorModal);
            })
            .catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={startKvp}
            tekstariaLabel="Begrunnelse:"
            tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={
                <BodyShort size="small">
                    Når du klikker «Bekreft» vil bare veiledere i din enhet ha tilgang på dialoger, aktiviteter og mål
                    som blir opprettet i KVP-perioden. Du må skrive en kommentar før du bekrefter.
                </BodyShort>
            }
            isLoading={false}
            maxLength={250}
        />
    );
}

export default StarKvpPeriode;
