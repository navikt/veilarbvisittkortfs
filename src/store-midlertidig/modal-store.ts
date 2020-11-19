import { useState } from 'react';
import constate from 'constate';
import { StartManuellOppfolgingKvitteringProps } from '../component/veilederverktoy/start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import { StartDigitalOppfolgingKvitteringProps } from '../component/veilederverktoy/start-digital-oppfolging/start-digital-oppfolging-kvittering';
import { OpprettOppgaveKvitteringProps } from '../component/veilederverktoy/opprett-oppgave/opprett-oppgave-kvittering';

export enum ModalType {
    START_ESKALERING,
    VIS_ARBEIDSLISTE,
    TILDEL_VEILEDER,
    TILDEL_VEILEDER_FEILET,
    TILDEL_VEILEDER_KVITTERING,
    START_ESKALERING_KVITTERING,
    MANUELL_OPPFOLGING,
    SETT_MANUELL_KVITTERING,
    START_DIGITAL_OPPFOLGING,
    START_DIGITAL_OPPFOLING_KVITTERIG,
    START_KVP_PERIODE,
    START_KVP_PERIODE_KVITTERING,
    STOPP_KVP_PERIODE,
    STOPP_KVP_PERIODE_KVITTERING,
    OPPRETT_OPPGAVE,
    OPPGAVE_KVITTERING,
    AVSLUTT_OPPFOLGING,
    AVLUTT_OPPFOLGING_BEKREFT,
    AVSLUTT_OPPFOLGING_KVITTERING,
    STOPP_ESKALERING,
    STOPP_ESKALERING_KVITTERING,
    VIS_HISTORIKK,
    FEIL_I_VEILEDERVERKTOY,
    SPINNER,
}

export interface ModalState {
    type: ModalType;
    props?: {};
}

export const [ModalStore, useModalStore] = constate(() => {
    const [activeModalState, setActiveModalState] = useState<ModalState>();

    function showModal(type: ModalType) {
        setActiveModalState({ type });
    }

    function showErrorModal() {
        setActiveModalState({ type: ModalType.FEIL_I_VEILEDERVERKTOY });
    }

    function showSpinnerModal() {
        setActiveModalState({ type: ModalType.SPINNER });
    }

    function showStartManuellOppfolgingKvitteringModal(props: StartManuellOppfolgingKvitteringProps) {
        setActiveModalState({ type: ModalType.SETT_MANUELL_KVITTERING, props });
    }

    function showStartDigitalOppfolgingKvitteringModal(props: StartDigitalOppfolgingKvitteringProps) {
        setActiveModalState({ type: ModalType.START_DIGITAL_OPPFOLING_KVITTERIG, props });
    }

    function showOpprettOppgaveKvitteringModal(props: OpprettOppgaveKvitteringProps) {
        setActiveModalState({ type: ModalType.OPPGAVE_KVITTERING, props });
    }

    function showStartKvpPeriodeKvitteringModal() {
        setActiveModalState({ type: ModalType.START_KVP_PERIODE_KVITTERING });
    }

    function hideModal() {
        setActiveModalState(undefined);
    }

    return {
        activeModalState,
        showModal,
        showErrorModal,
        showSpinnerModal,
        showStartManuellOppfolgingKvitteringModal,
        showStartDigitalOppfolgingKvitteringModal,
        showOpprettOppgaveKvitteringModal,
        showStartKvpPeriodeKvitteringModal,
        hideModal,
    };
});
