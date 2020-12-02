import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { useAppStore } from '../../../store/app-store';
import { eskaleringVarselSendtEvent } from '../../../util/utils';
import { startEskalering, useFetchOppfolging } from '../../../api/veilarboppfolging';
import {
    Egenskaper,
    HenvendelseData,
    nyHenvendelse,
    oppdaterFerdigbehandlet,
    oppdaterVenterPaSvar,
} from '../../../api/veilarbdialog';

interface OwnValues extends StartEskaleringValues {
    overskrift: string;
    tekst: string;
}

const initialValues = {
    begrunnelse: '',
    brukMalvelger: true,
    overskrift: 'Du har fått et varsel fra NAV',
    tekst: '',
};

function StartEskalering() {
    const { brukerFnr } = useAppStore();
    const { oppfolging, harBruktNivaa4, setOppfolging } = useDataStore();
    const { showSpinnerModal, showStartEskaleringKvitteringModal, hideModal, showErrorModal } = useModalStore();

    const fetchOppfolging = useFetchOppfolging(brukerFnr, { manual: true });

    function opprettHenvendelse(values: OwnValues) {
        showSpinnerModal();

        const hendvendelseData: HenvendelseData = {
            begrunnelse: values.begrunnelse,
            overskrift: values.overskrift,
            egenskaper: [Egenskaper.ESKALERINGSVARSEL],
            tekst: values.begrunnelse,
        };

        // TODO: Dette er kanskje logikk som burde bli gjort i backend istedenfor
        nyHenvendelse(brukerFnr, hendvendelseData)
            .then(async (res) => {
                const dialogId = res.data.id;
                const dialogHenvendelseTekst = res.data.henvendelser[0].tekst;

                const oppdaterFerdigbehandletPromise = oppdaterFerdigbehandlet(dialogId, true, brukerFnr);
                const oppdaterVenterPaSvarPromise = oppdaterVenterPaSvar(dialogId, true, brukerFnr);
                const startEskaleringPromise = startEskalering(dialogId, dialogHenvendelseTekst, brukerFnr);

                try {
                    await Promise.all([
                        oppdaterFerdigbehandletPromise,
                        oppdaterVenterPaSvarPromise,
                        startEskaleringPromise,
                    ]);

                    // Hent oppdatert data med ny eskaleringsvarsel
                    await fetchOppfolging
                        .fetch()
                        .then((res) => setOppfolging(res.data))
                        .catch(); // Selv om henting av oppfolging feiler så ønsker vi å vise kvittering på at eskaleringen gikk greit

                    eskaleringVarselSendtEvent();
                    showStartEskaleringKvitteringModal();
                } catch (e) {
                    showErrorModal();
                }
            })
            .catch(showErrorModal);
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
