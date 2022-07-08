import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import StartEskaleringForm, { StartEskaleringValues } from './start-eskalering-form';
import { useModalStore } from '../../../store/modal-store';
import { useDataStore } from '../../../store/data-store';
import { useAppStore } from '../../../store/app-store';
import { eskaleringVarselSendtEvent, ifResponseHasData } from '../../../util/utils';
import { hentGjeldendeEskaleringsvarsel, startEskalering } from '../../../api/veilarbdialog';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import { fetchHarNivaa4 } from '../../../api/veilarbperson';
import { logMetrikk } from '../../../util/logger';

interface OwnValues extends StartEskaleringValues {
    overskrift: string;
    tekst: string;
    type: string;
}

const initialValues = {
    begrunnelse: '',
    brukMalvelger: true,
    overskrift: 'Du har fått et varsel fra NAV',
    tekst: '',
    type: 'ikke_valgt'
};

function StartEskalering() {
    const { brukerFnr } = useAppStore();
    const { oppfolging, setGjeldendeEskaleringsvarsel } = useDataStore();
    const { showSpinnerModal, showStartEskaleringKvitteringModal, hideModal, showErrorModal } = useModalStore();

    const gjeldendeEskaleringsvarselFetcher = useAxiosFetcher(hentGjeldendeEskaleringsvarsel);
    const harNivaa4Fetcher = useAxiosFetcher(fetchHarNivaa4);

    async function opprettHenvendelse(values: OwnValues) {
        showSpinnerModal();

        try {
            await startEskalering({
                fnr: brukerFnr,
                begrunnelse: values.begrunnelse,
                overskrift: values.overskrift,
                tekst: values.begrunnelse
            });

            logMetrikk(
                'veilarbvisittkortfs.metrikker.forhonshorendtering.sendt',
                { type: values.type },
                { typeTag: values.type }
            );

            // Hent oppdatert data med ny eskaleringsvarsel
            await gjeldendeEskaleringsvarselFetcher
                .fetch(brukerFnr)
                .then(ifResponseHasData(setGjeldendeEskaleringsvarsel));

            eskaleringVarselSendtEvent();
            showStartEskaleringKvitteringModal();
        } catch (_) {
            showErrorModal();
        }
    }

    useEffect(() => {
        harNivaa4Fetcher.fetch(brukerFnr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brukerFnr]);

    if (harNivaa4Fetcher.loading) {
        return <LasterModal />;
    }

    if (!oppfolging?.kanVarsles || !harNivaa4Fetcher.data?.harbruktnivaa4) {
        const varselTekst = !oppfolging?.kanVarsles
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
