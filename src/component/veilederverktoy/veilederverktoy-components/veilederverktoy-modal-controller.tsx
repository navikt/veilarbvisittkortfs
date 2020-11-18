import React from 'react';
import StartEskalering from '../start-eskalering/start-eskalering';
import StartEskaleringKvittering from '../start-eskalering/start-eskalering-kvittering';
import StarManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging';
import StartManuellOppfolgingKvittering from '../start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import StarKvpPeriode from '../start-kvp-periode/start-kvp-periode';
import StartKVPKvittering from '../start-kvp-periode/start-kvp-periode-kvittering';
import StoppKvpPeriode from '../stopp-kvp-periode/stopp-kvp-periode';
import StoppKVPKvittering from '../stopp-kvp-periode/stopp-kvp-periode-kvittering';
import StartDigitalOppfolgingKvittering from '../start-digital-oppfolging/start-digital-oppfolging-kvittering';
import StartDigitalOppfolging from '../start-digital-oppfolging/start-digital-oppfolging';
import OpprettOppgave from '../opprett-oppgave/opprett-oppgave';
import OpprettOppgaveKvittering, { OpprettOppgaveKvitteringProps } from '../opprett-oppgave/opprett-oppgave-kvittering';
import AvsluttOppfolging from '../avsluttoppfolging/avslutt-oppfolging';
import AvsluttOppfolgingKvittering from '../avsluttoppfolging/avslutt-oppfolging-kvittering';
import StoppEskalering from '../stopp-eskalering/stopp-eskalering';
import AvsluttOppfolgingBekreft from '../avsluttoppfolging/avslutt-oppfolging-bekreft';
import StopEskaleringKvittering from '../stopp-eskalering/stopp-esklaring-kvittering';
import { FeilModal } from '../prosess/feil-modal';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import Historikk from '../historikk/historikk';
import ArbeidslisteController from '../../arbeidsliste/arbeidsliste-controller';
import TildelVeileder from '../tildel-veileder/tildel-veileder';
import { TildelVeilederKvittering } from '../tildel-veileder/tildel-veileder-kvittering';
import { FeilTildelingModal } from '../tildel-veileder/tildel-veileder-feil-modal';
import { ModalType, useModalStore } from '../../../store-midlertidig/modal-store';

export function VeilederverktoyModalController() {
    const { activeModalState } = useModalStore();

    if (!activeModalState) {
        return null;
    }

    switch (activeModalState.type) {
        case ModalType.START_ESKALERING:
            return <StartEskalering />;
        case ModalType.VIS_ARBEIDSLISTE:
            return <ArbeidslisteController />;
        case ModalType.TILDEL_VEILEDER:
            return <TildelVeileder />;
        case ModalType.TILDEL_VEILEDER_FEILET:
            return <FeilTildelingModal />;
        case ModalType.TILDEL_VEILEDER_KVITTERING:
            return <TildelVeilederKvittering />;
        case ModalType.START_ESKALERING_KVITTERING:
            return <StartEskaleringKvittering />;
        case ModalType.MANUELL_OPPFOLGING:
            return <StarManuellOppfolging />;
        case ModalType.SETT_MANUELL_KVITTERING:
            return <StartManuellOppfolgingKvittering {...activeModalState.props} />;
        case ModalType.START_DIGITAL_OPPFOLGING:
            return <StartDigitalOppfolging />;
        case ModalType.START_DIGITAL_OPPFOLING_KVITTERIG:
            return <StartDigitalOppfolgingKvittering {...activeModalState.props} />;
        case ModalType.START_KVP_PERIODE:
            return <StarKvpPeriode />;
        case ModalType.START_KVP_PERIODE_KVITTERING:
            return <StartKVPKvittering />;
        case ModalType.STOPP_KVP_PERIODE:
            return <StoppKvpPeriode />;
        case ModalType.STOPP_KVP_PERIODE_KVITTERING:
            return <StoppKVPKvittering />;
        case ModalType.OPPRETT_OPPGAVE:
            return <OpprettOppgave />;
        case ModalType.OPPGAVE_KVITTERING:
            return <OpprettOppgaveKvittering {...(activeModalState.props as OpprettOppgaveKvitteringProps)} />;
        case ModalType.AVSLUTT_OPPFOLGING:
            return <AvsluttOppfolging />;
        case ModalType.AVLUTT_OPPFOLGING_BEKREFT:
            return <AvsluttOppfolgingBekreft />;
        case ModalType.AVSLUTT_OPPFOLGING_KVITTERING:
            return <AvsluttOppfolgingKvittering />;
        case ModalType.STOPP_ESKALERING:
            return <StoppEskalering />;
        case ModalType.STOPP_ESKALERING_KVITTERING:
            return <StopEskaleringKvittering />;
        case ModalType.VIS_HISTORIKK:
            return <Historikk />;
        case ModalType.FEIL_I_VEILEDERVERKTOY:
            return <FeilModal />;
        case ModalType.LASTER:
            return <LasterModal />;
        default:
            return null;
    }
}
