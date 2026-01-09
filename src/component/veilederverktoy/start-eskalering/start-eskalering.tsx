import { Modal } from '@navikt/ds-react';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import { useModalStore } from '../../../store/modal-store';
import { useBrukerFnr } from '../../../store/app-store';
import { eskaleringVarselSendtEvent } from '../../../util/utils';
import { startEskalering, useGjeldendeEskaleringsvarsel } from '../../../api/veilarbdialog';
import { logMetrikk } from '../../../util/logger';
import { useOppfolging } from '../../../api/veilarboppfolging';

interface OwnValues extends StartEskaleringValues {
    overskrift: string;
    tekst: string;
    type: string;
}

const initialValues = {
    begrunnelse: '',
    brukMalvelger: true,
    overskrift: 'Du har fått et varsel fra Nav',
    tekst: '',
    type: 'ikke_valgt'
};

function StartEskalering() {
    const brukerFnr = useBrukerFnr();
    const { oppfolging } = useOppfolging(brukerFnr);
    const { mutate: refreshGjeldendeEskaleringsvarsel } = useGjeldendeEskaleringsvarsel(brukerFnr);
    const { showSpinnerModal, showStartEskaleringKvitteringModal, hideModal, showErrorModal } = useModalStore();

    async function opprettHenvendelse(values: OwnValues) {
        if (!brukerFnr) return;
        showSpinnerModal();

        try {
            await startEskalering({
                fnr: brukerFnr,
                begrunnelse: values.begrunnelse,
                overskrift: values.overskrift,
                tekst: values.begrunnelse,
                begrunnelseType: values.type
            });

            logMetrikk(
                'veilarbvisittkortfs.metrikker.forhonshorendtering.sendt',
                { type: values.type },
                { typeTag: values.type }
            );

            // Hent oppdatert data med ny eskaleringsvarsel
            await refreshGjeldendeEskaleringsvarsel();

            eskaleringVarselSendtEvent();
            showStartEskaleringKvitteringModal();
        } catch {
            showErrorModal();
        }
    }

    if (!oppfolging?.kanVarsles) {
        const varselTekst = !oppfolging?.kanVarsles
            ? 'Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende varsel.'
            : 'Du kan ikke sende varsel fordi brukeren ikke har vært innlogget de siste 18 månedene med nivå 4 (for eksempel BankID).';

        return (
            <VarselModal onRequestClose={hideModal} isOpen={true} type="ADVARSEL">
                <Modal.Body className="veilarbvisittkortfs-varsel-modal-body">{varselTekst}</Modal.Body>
            </VarselModal>
        );
    }

    return <StartEskaleringForm handleSubmit={opprettHenvendelse} initialValues={initialValues} />;
}

export default StartEskalering;
