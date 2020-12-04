import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { useAppStore } from '../../../store/app-store';
import { eskaleringVarselSendtEvent, ifResponseHasData } from '../../../util/utils';
import { startEskalering } from '../../../api/veilarboppfolging';
import {
    Egenskaper,
    HenvendelseData,
    nyHenvendelse,
    oppdaterFerdigbehandlet,
    oppdaterVenterPaSvar,
} from '../../../api/veilarbdialog';
import { useFetchHarNivaa4 } from '../../../api/veilarbperson';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { useFetcherStore } from '../../../store/fetcher-store';

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
    const { oppfolging, setOppfolging } = useDataStore();
    const { oppfolgingFetcher } = useFetcherStore();
    const { showSpinnerModal, showStartEskaleringKvitteringModal, hideModal, showErrorModal } = useModalStore();

    const fetchHarNivaa4 = useFetchHarNivaa4(brukerFnr);

    function opprettHenvendelse(values: OwnValues) {
        showSpinnerModal();

        const hendvendelseData: HenvendelseData = {
            begrunnelse: values.begrunnelse,
            overskrift: values.overskrift,
            egenskaper: [Egenskaper.ESKALERINGSVARSEL],
            tekst: values.begrunnelse,
        };

        // TODO: Dette er kanskje logikk som kunne blitt gjort i backend istedenfor
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
                    await oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

                    eskaleringVarselSendtEvent();
                    showStartEskaleringKvitteringModal();
                } catch (e) {
                    showErrorModal();
                }
            })
            .catch(showErrorModal);
    }

    if (fetchHarNivaa4.loading) {
        return <LasterModal />;
    }

    if (!oppfolging.reservasjonKRR || !fetchHarNivaa4.data?.harbruktnivaa4) {
        const varselTekst = !oppfolging.reservasjonKRR
            ? 'Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende varsel.'
            : 'Du kan ikke sende varsel fordi systemet ikke får sjekket om denne brukeren er en digital eller manuell bruker.';

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
            isLoading={false}
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
