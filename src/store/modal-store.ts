import { useState } from 'react';
import constate from 'constate';
import { StartManuellOppfolgingKvitteringProps } from '../component/veilederverktoy/start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import { StartDigitalOppfolgingKvitteringProps } from '../component/veilederverktoy/start-digital-oppfolging/start-digital-oppfolging-kvittering';
import { OpprettOppgaveKvitteringProps } from '../component/veilederverktoy/opprett-oppgave/opprett-oppgave-kvittering';
import { AvsluttOppfolgingBekreftelseModalProps } from '../component/veilederverktoy/avsluttoppfolging/avslutt-oppfolging-bekreft';
import { TildelVeilederKvitteringProps } from '../component/veilederverktoy/tildel-veileder/tildel-veileder-kvittering';

export enum ModalType {
    START_ESKALERING,
    ARBEIDSLISTE,
    FJERN_ARBEIDSLISTE,
    TILDEL_VEILEDER,
    TILDEL_VEILEDER_FEILET,
    TILDEL_VEILEDER_KVITTERING,
    START_ESKALERING_KVITTERING,
    START_MANUELL_OPPFOLGING,
    START_MANUELL_KVITTERING,
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
    HISTORIKK,
    FEIL_I_VEILEDERVERKTOY,
    SPINNER,
    HUSKELAPP,
    FJERN_HUSKELAPP,
    HUSKELAPP_REDIGERE,
    HUSKELAPP_REDIGERE_MED_ARBEIDSLISTE
}

export interface ModalState {
    type: ModalType;
    props?: {};
}

// Denne storen blir brukt av <VeilederverktoyModalController/> for å sette hvilken dialog som skal vises
export const [ModalStore, useModalStore] = constate(() => {
    const [activeModalState, setActiveModalState] = useState<ModalState>();

    function showModal(type: ModalType, props?: {}) {
        setActiveModalState({ type, props });
    }

    function hideModal() {
        setActiveModalState(undefined);
    }

    function showErrorModal() {
        showModal(ModalType.FEIL_I_VEILEDERVERKTOY);
    }

    function showSpinnerModal() {
        showModal(ModalType.SPINNER);
    }

    function showTildelVeilederModal() {
        showModal(ModalType.TILDEL_VEILEDER);
    }

    function showStartEskaleringModal() {
        showModal(ModalType.START_ESKALERING);
    }

    function showStoppEskaleringModal() {
        showModal(ModalType.STOPP_ESKALERING);
    }

    function showStartManuellOppfolgingModal() {
        showModal(ModalType.START_MANUELL_OPPFOLGING);
    }

    function showStartDigitalOppfolgingModal() {
        showModal(ModalType.START_DIGITAL_OPPFOLGING);
    }

    function showStartKvpPeriodeModal() {
        showModal(ModalType.START_KVP_PERIODE);
    }

    function showStoppKvpPeriodeModal() {
        showModal(ModalType.STOPP_KVP_PERIODE);
    }

    function showOpprettOppgaveModal() {
        showModal(ModalType.OPPRETT_OPPGAVE);
    }

    function showAvsluttOppfolgingModal() {
        showModal(ModalType.AVSLUTT_OPPFOLGING);
    }

    function showHistorikkModal() {
        showModal(ModalType.HISTORIKK);
    }

    function showStartManuellOppfolgingKvitteringModal(props: StartManuellOppfolgingKvitteringProps) {
        showModal(ModalType.START_MANUELL_KVITTERING, props);
    }

    function showStartDigitalOppfolgingKvitteringModal(props: StartDigitalOppfolgingKvitteringProps) {
        showModal(ModalType.START_DIGITAL_OPPFOLING_KVITTERIG, props);
    }

    function showOpprettOppgaveKvitteringModal(props: OpprettOppgaveKvitteringProps) {
        showModal(ModalType.OPPGAVE_KVITTERING, props);
    }

    function showtAvsluttOppfolgingBekrefModal(props: AvsluttOppfolgingBekreftelseModalProps) {
        showModal(ModalType.AVLUTT_OPPFOLGING_BEKREFT, props);
    }

    function showAvsluttOppfolgingKvitteringModal() {
        showModal(ModalType.AVSLUTT_OPPFOLGING_KVITTERING);
    }

    function showTildelVeilederKvitteringModal(props: TildelVeilederKvitteringProps) {
        showModal(ModalType.TILDEL_VEILEDER_KVITTERING, props);
    }

    function showTildelVeilederFeiletModal() {
        showModal(ModalType.TILDEL_VEILEDER_FEILET);
    }

    function showArbeidslisteModal() {
        showModal(ModalType.ARBEIDSLISTE);
    }

    function showFjernArbeidslisteModal() {
        showModal(ModalType.FJERN_ARBEIDSLISTE);
    }

    function showHuskelappModal() {
        showModal(ModalType.HUSKELAPP);
    }

    function showHuskelappRedigereModal() {
        showModal(ModalType.HUSKELAPP_REDIGERE);
    }

    function showHuskelappRedigereMedArbeidslisteModal() {
        showModal(ModalType.HUSKELAPP_REDIGERE_MED_ARBEIDSLISTE);
    }

    function showFjernHuskelappModal() {
        showModal(ModalType.FJERN_HUSKELAPP);
    }

    function showStartEskaleringKvitteringModal() {
        showModal(ModalType.START_ESKALERING_KVITTERING);
    }

    function showStartKvpPeriodeKvitteringModal() {
        showModal(ModalType.START_KVP_PERIODE_KVITTERING);
    }

    function showStoppKvpPeriodeKvitteringModal() {
        showModal(ModalType.STOPP_KVP_PERIODE_KVITTERING);
    }

    function showStoppEskaleringKvitteringModal() {
        showModal(ModalType.STOPP_ESKALERING_KVITTERING);
    }

    return {
        activeModalState,
        hideModal,
        showErrorModal,
        showSpinnerModal,
        showStartManuellOppfolgingKvitteringModal,
        showStartDigitalOppfolgingKvitteringModal,
        showOpprettOppgaveKvitteringModal,
        showtAvsluttOppfolgingBekrefModal,
        showAvsluttOppfolgingKvitteringModal,
        showStartKvpPeriodeKvitteringModal,
        showStoppKvpPeriodeKvitteringModal,
        showTildelVeilederKvitteringModal,
        showTildelVeilederFeiletModal,
        showArbeidslisteModal,
        showFjernArbeidslisteModal,
        showStartEskaleringKvitteringModal,
        showStoppEskaleringKvitteringModal,
        showTildelVeilederModal,
        showStartEskaleringModal,
        showStoppEskaleringModal,
        showStartManuellOppfolgingModal,
        showStartDigitalOppfolgingModal,
        showStartKvpPeriodeModal,
        showStoppKvpPeriodeModal,
        showOpprettOppgaveModal,
        showAvsluttOppfolgingModal,
        showHistorikkModal,
        showHuskelappModal,
        showFjernHuskelappModal,
        showHuskelappRedigereModal,
        showHuskelappRedigereMedArbeidslisteModal
    };
});
