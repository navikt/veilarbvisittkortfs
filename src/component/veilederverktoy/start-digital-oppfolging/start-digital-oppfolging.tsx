import React from 'react';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { useAppStore } from '../../../store/app-store';
import { useDataStore } from '../../../store/data-store';
import { useModalStore } from '../../../store/modal-store';
import { fetchOppfolging, settBrukerTilDigital } from '../../../api/veilarboppfolging';
import { ifResponseHasData } from '../../../util/utils';
import { useAxiosFetcher } from '../../../util/hook/use-axios-fetcher';
import {Alert, BodyShort} from "@navikt/ds-react";

function StartDigitalOppfolging() {
    const { brukerFnr } = useAppStore();
    const { innloggetVeileder, oppfolging, setOppfolging } = useDataStore();
    const { hideModal, showStartDigitalOppfolgingKvitteringModal, showSpinnerModal, showErrorModal } = useModalStore();

    const oppfolgingFetcher = useAxiosFetcher(fetchOppfolging);

    function startDigitalOppgfolging(begrunnelseValues: BegrunnelseValues) {
        showSpinnerModal();
        settBrukerTilDigital(brukerFnr, innloggetVeileder!.ident, begrunnelseValues.begrunnelse)
            .then(() => {
                oppfolgingFetcher.fetch(brukerFnr).then(ifResponseHasData(setOppfolging));

                showStartDigitalOppfolgingKvitteringModal({ begrunnelse: begrunnelseValues.begrunnelse });
            })
            .catch(showErrorModal);
    }

    if (oppfolging?.reservasjonKRR) {
        return (
            <VarselModal
                type="ADVARSEL"
                contentLabel="Brukeren er reservert i KRR"
                isOpen={true}
                onRequestClose={hideModal}
            >
                <BodyShort>
                    Brukeren er reservert i Kontakt- og reservasjonsregisteret og må selv fjerne reservasjonen for å få
                    digital oppfølging.
                </BodyShort>
            </VarselModal>
        );
    }

    const infoTekst = (
        <Alert variant="warning" className="blokk-xxs">
            Når du endrer til digital oppfølging, kan du ha dialog med brukeren i aktivitetsplanen.
        </Alert>
    );

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={startDigitalOppgfolging}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            tittel="Endre til digital oppfølging"
            infoTekst={infoTekst}
            isLoading={false}
        />
    );
}

export default StartDigitalOppfolging;
