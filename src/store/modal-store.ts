import { create } from 'zustand';

import { StartManuellOppfolgingKvitteringProps } from '../component/veilederverktoy/start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import { StartDigitalOppfolgingKvitteringProps } from '../component/veilederverktoy/start-digital-oppfolging/start-digital-oppfolging-kvittering';
import { OpprettOppgaveKvitteringProps } from '../component/veilederverktoy/opprett-oppgave/opprett-oppgave-kvittering';
import { AvsluttOppfolgingBekreftelseModalProps } from '../component/veilederverktoy/avsluttoppfolging/avslutt-oppfolging-bekreft';
import { TildelVeilederKvitteringProps } from '../component/veilederverktoy/tildel-veileder/tildel-veileder-kvittering';

export enum ModalType {
    START_ESKALERING,
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
    BYTT_OPPFOLGINGSKONTOR
}

export interface ModalState {
    type: ModalType;
    props?: object;
}

interface ModalStoreState {
    activeModalState: ModalState | null;
}
interface ModalStoreActions {
    showModal(type: ModalType, props?: object): void;
    hideModal(): void;
    showErrorModal(): void;
    showSpinnerModal(): void;
    showTildelVeilederModal(): void;
    showStartEskaleringModal(): void;
    showStoppEskaleringModal(): void;
    showStartManuellOppfolgingModal(): void;
    showStartDigitalOppfolgingModal(): void;
    showStartKvpPeriodeModal(): void;
    showStoppKvpPeriodeModal(): void;
    showOpprettOppgaveModal(): void;
    showAvsluttOppfolgingModal(): void;
    showHistorikkModal(): void;
    showStartManuellOppfolgingKvitteringModal(props: StartManuellOppfolgingKvitteringProps): void;
    showStartDigitalOppfolgingKvitteringModal(props: StartDigitalOppfolgingKvitteringProps): void;
    showOpprettOppgaveKvitteringModal(props: OpprettOppgaveKvitteringProps): void;
    showtAvsluttOppfolgingBekrefModal(props: AvsluttOppfolgingBekreftelseModalProps): void;
    showAvsluttOppfolgingKvitteringModal(): void;
    showTildelVeilederKvitteringModal(props: TildelVeilederKvitteringProps): void;
    showTildelVeilederFeiletModal(): void;
    showHuskelappRedigereModal(): void;
    showFjernHuskelappModal(): void;
    showStartEskaleringKvitteringModal(): void;
    showStartKvpPeriodeKvitteringModal(): void;
    showStoppKvpPeriodeKvitteringModal(): void;
    showStoppEskaleringKvitteringModal(): void;
    showByttOppfolgingKontorModal(): void;
}

// Denne storen blir brukt av <VeilederverktoyModalController/> for å sette hvilken dialog som skal vises
export const _useModalStore = create<ModalStoreState & ModalStoreActions>(set => ({
    activeModalState: null,
    showModal(type: ModalType, props?: object) {
        set({ activeModalState: { type, props } });
    },
    hideModal() {
        set({ activeModalState: undefined });
    },
    showErrorModal() {
        set({ activeModalState: { type: ModalType.FEIL_I_VEILEDERVERKTOY } });
    },
    showSpinnerModal() {
        set({ activeModalState: { type: ModalType.SPINNER } });
    },
    showTildelVeilederModal() {
        set({ activeModalState: { type: ModalType.TILDEL_VEILEDER } });
    },
    showStartEskaleringModal() {
        set({ activeModalState: { type: ModalType.START_ESKALERING } });
    },
    showStoppEskaleringModal() {
        set({ activeModalState: { type: ModalType.STOPP_ESKALERING } });
    },
    showStartManuellOppfolgingModal() {
        set({ activeModalState: { type: ModalType.START_MANUELL_OPPFOLGING } });
    },
    showStartDigitalOppfolgingModal() {
        set({ activeModalState: { type: ModalType.START_DIGITAL_OPPFOLGING } });
    },
    showStartKvpPeriodeModal() {
        set({ activeModalState: { type: ModalType.START_KVP_PERIODE } });
    },
    showStoppKvpPeriodeModal() {
        set({ activeModalState: { type: ModalType.STOPP_KVP_PERIODE } });
    },
    showOpprettOppgaveModal() {
        set({ activeModalState: { type: ModalType.OPPRETT_OPPGAVE } });
    },
    showAvsluttOppfolgingModal() {
        set({ activeModalState: { type: ModalType.AVSLUTT_OPPFOLGING } });
    },
    showHistorikkModal() {
        set({ activeModalState: { type: ModalType.HISTORIKK } });
    },
    showStartManuellOppfolgingKvitteringModal(props: StartManuellOppfolgingKvitteringProps) {
        set({ activeModalState: { type: ModalType.START_MANUELL_KVITTERING, props } });
    },
    showStartDigitalOppfolgingKvitteringModal(props: StartDigitalOppfolgingKvitteringProps) {
        set({ activeModalState: { type: ModalType.START_DIGITAL_OPPFOLING_KVITTERIG, props } });
    },
    showOpprettOppgaveKvitteringModal(props: OpprettOppgaveKvitteringProps) {
        set({ activeModalState: { type: ModalType.OPPGAVE_KVITTERING, props } });
    },
    showtAvsluttOppfolgingBekrefModal(props: AvsluttOppfolgingBekreftelseModalProps) {
        set({ activeModalState: { type: ModalType.AVLUTT_OPPFOLGING_BEKREFT, props } });
    },
    showAvsluttOppfolgingKvitteringModal() {
        set({ activeModalState: { type: ModalType.AVSLUTT_OPPFOLGING_KVITTERING } });
    },
    showTildelVeilederKvitteringModal(props: TildelVeilederKvitteringProps) {
        set({ activeModalState: { type: ModalType.TILDEL_VEILEDER_KVITTERING, props } });
    },
    showTildelVeilederFeiletModal() {
        set({ activeModalState: { type: ModalType.TILDEL_VEILEDER_FEILET } });
    },
    showHuskelappRedigereModal() {
        set({ activeModalState: { type: ModalType.HUSKELAPP_REDIGERE } });
    },
    showFjernHuskelappModal() {
        set({ activeModalState: { type: ModalType.FJERN_HUSKELAPP } });
    },
    showStartEskaleringKvitteringModal() {
        set({ activeModalState: { type: ModalType.START_ESKALERING_KVITTERING } });
    },
    showStartKvpPeriodeKvitteringModal() {
        set({ activeModalState: { type: ModalType.START_KVP_PERIODE_KVITTERING } });
    },
    showStoppKvpPeriodeKvitteringModal() {
        set({ activeModalState: { type: ModalType.STOPP_KVP_PERIODE_KVITTERING } });
    },
    showStoppEskaleringKvitteringModal() {
        set({ activeModalState: { type: ModalType.STOPP_ESKALERING_KVITTERING } });
    },
    showByttOppfolgingKontorModal() {
        set({ activeModalState: { type: ModalType.BYTT_OPPFOLGINGSKONTOR } });
    }
}));

export const useModalStore = () => _useModalStore(state => state);
