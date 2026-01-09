import { BodyShort } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { useBrukerFnr } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { stoppKvpOppfolging, useOppfolging } from '../../../api/veilarboppfolging';

function StoppKvpPeriode() {
    const brukerFnr = useBrukerFnr();
    const { mutate: refreshOppfolging } = useOppfolging(brukerFnr);
    const { showStoppKvpPeriodeKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function stoppKvp({ begrunnelse }: BegrunnelseValues) {
        if (!brukerFnr) return;
        showSpinnerModal();

        stoppKvpOppfolging(brukerFnr, begrunnelse)
            .then(() => {
                refreshOppfolging().then(showStoppKvpPeriodeKvitteringModal).catch(showErrorModal);
            })
            .catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={stoppKvp}
            tekstariaLabel="Begrunnelse:"
            tittel="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={
                <BodyShort size="small">
                    KVP-perioden til brukeren er avsluttet. Veiledere i andre enheter har nå tilgang til dialoger,
                    aktiviteter og mål som er opprettet før og etter KVP-perioden.
                </BodyShort>
            }
            isLoading={false}
            maxLength={250}
        />
    );
}

export default StoppKvpPeriode;
