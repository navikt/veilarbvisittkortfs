import React from 'react';
import { HenvendelseData } from '../../../store/dialog/actions';
import { Normaltekst } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import { ModalType, useModalStore } from '../../../store-midlertidig/modal-store';
import { useDataStore } from '../../../store-midlertidig/data-store';
import { nyHenvendelse } from '../../../api/api-midlertidig';
import { useAppStore } from '../../../store-midlertidig/app-store';

interface OwnValues extends StartEskaleringValues {
    overskrift: string;
    tekst: string;
}

function StartEskalering() {
    const { brukerFnr } = useAppStore();
    const { oppfolging, harBruktNivaa4 } = useDataStore();
    const { showModal, showSpinnerModal, hideModal } = useModalStore();

    function opprettHenvendelse(values: OwnValues) {
        showSpinnerModal();

        const hendvendelseData: HenvendelseData = {
            begrunnelse: values.begrunnelse,
            overskrift: values.overskrift,
            egenskaper: ['ESKALERINGSVARSEL'],
            tekst: values.begrunnelse,
        };

        nyHenvendelse(brukerFnr, hendvendelseData)
            .then(() => showModal(ModalType.START_ESKALERING))
            .catch(() => showModal(ModalType.FEIL_I_VEILEDERVERKTOY));
    }

    if (!oppfolging.reservasjonKRR || !harBruktNivaa4?.harbruktnivaa4) {
        const varselTekst = !oppfolging.reservasjonKRR
            ? 'Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende varsel.'
            : 'Du kan ikke sende varsel fordi brukeren ikke har vært innlogget de siste 18 månedene med nivå 4 (for eksempel BankID).';

        return (
            <VarselModal
                className=""
                contentLabel="Bruker kan ikke varsles"
                onRequestClose={hideModal}
                isOpen={true}
                type="ADVARSEL"
            >
                {varselTekst}
            </VarselModal>
        );
    }

    const initialValues = {
        begrunnelse: '',
        brukMalvelger: true,
        overskrift: 'Du har fått et varsel fra NAV',
        tekst: '',
    };
    return (
        <StartEskaleringForm
            handleSubmit={opprettHenvendelse}
            initialValues={initialValues}
            tekstariaLabel="Rediger teksten under slik at den passer."
            maxLength={5000}
            tittel="Send varsel til brukeren"
            isLoading={false} // TODO: Fix? (OppfolgingSelector.selectOppfolgingStatus(state) || state.dialoger.status === 'LOADING')
            infoTekst={
                <Normaltekst className="blokk-xs">
                    Husk å være tydelig på hvilken oppgave brukeren skal gjennomføre og hva som er fristen. Hvis du
                    varsler om at en ytelse kan bli stanset eller en annen reaksjon fra NAV, må du vise til lovhjemler.
                </Normaltekst>
            }
        />
    );
}

export default StartEskalering;
