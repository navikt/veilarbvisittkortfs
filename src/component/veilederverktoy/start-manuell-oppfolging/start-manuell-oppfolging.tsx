import { Alert } from '@navikt/ds-react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { useBrukerFnr } from '../../../store/app-store';
import { useModalStore } from '../../../store/modal-store';
import { settBrukerTilManuell, useOppfolging } from '../../../api/veilarboppfolging';
import { useInnloggetVeileder } from '../../../api/veilarbveileder';

function StartManuellOppfolging() {
    const brukerFnr = useBrukerFnr();
    const { mutate: refreshOppfolging } = useOppfolging(brukerFnr);
    const { innloggetVeileder } = useInnloggetVeileder();
    const { showStartManuellOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    function settBrukerTilManuellOppfolging(values: BegrunnelseValues) {
        if (!brukerFnr) return;
        showSpinnerModal();
        settBrukerTilManuell(brukerFnr, innloggetVeileder!.ident, values.begrunnelse)
            .then(() => {
                refreshOppfolging();
                showStartManuellOppfolgingKvitteringModal({ begrunnelse: values.begrunnelse });
            })
            .catch(showErrorModal);
    }

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={settBrukerTilManuellOppfolging}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren trenger manuell oppfølging"
            tittel="Endre til manuell oppfølging"
            infoTekst={
                <Alert variant="warning">
                    Når du endrer til manuell oppfølging, har du ikke lenger mulighet til å ha dialog med brukeren i
                    aktivitetsplanen.
                </Alert>
            }
            isLoading={false}
        />
    );
}

export default StartManuellOppfolging;
