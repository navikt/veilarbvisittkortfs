import React from 'react';
import StartEskalering from '../start-eskalering/start-eskalering';
import StartEskaleringKvittering from '../start-eskalering/start-eskalering-kvittering';
import StarManuellOppfolging from '../start-manuell-oppfolging/start-manuell-oppfolging';
import StartManuellOppfolgingKvittering, {
    StartManuellOppfolgingKvitteringProps
} from '../start-manuell-oppfolging/start-manuell-oppfolging-kvittering';
import StarKvpPeriode from '../start-kvp-periode/start-kvp-periode';
import StartKVPKvittering from '../start-kvp-periode/start-kvp-periode-kvittering';
import StoppKvpPeriode from '../stopp-kvp-periode/stopp-kvp-periode';
import StoppKVPKvittering from '../stopp-kvp-periode/stopp-kvp-periode-kvittering';
import StartDigitalOppfolgingKvittering, {
    StartDigitalOppfolgingKvitteringProps
} from '../start-digital-oppfolging/start-digital-oppfolging-kvittering';
import StartDigitalOppfolging from '../start-digital-oppfolging/start-digital-oppfolging';
import OpprettOppgave from '../opprett-oppgave/opprett-oppgave';
import OpprettOppgaveKvittering, { OpprettOppgaveKvitteringProps } from '../opprett-oppgave/opprett-oppgave-kvittering';
import AvsluttOppfolging from '../avsluttoppfolging/avslutt-oppfolging';
import AvsluttOppfolgingKvittering from '../avsluttoppfolging/avslutt-oppfolging-kvittering';
import StoppEskalering from '../stopp-eskalering/stopp-eskalering';
import AvsluttOppfolgingBekreft, {
    AvsluttOppfolgingBekreftelseModalProps
} from '../avsluttoppfolging/avslutt-oppfolging-bekreft';
import StopEskaleringKvittering from '../stopp-eskalering/stopp-esklaring-kvittering';
import { FeilModal } from '../prosess/feil-modal';
import { LasterModal } from '../../components/lastermodal/laster-modal';
import Historikk from '../historikk/historikk';
import TildelVeileder from '../tildel-veileder/tildel-veileder';
import { TildelVeilederKvittering, TildelVeilederKvitteringProps } from '../tildel-veileder/tildel-veileder-kvittering';
import { FeilTildelingModal } from '../tildel-veileder/tildel-veileder-feil-modal';
import { ModalType, useModalStore } from '../../../store/modal-store';
import FjernArbeidslisteModal from '../../arbeidsliste/fjern-arbeidsliste-modal';
import ArbeidslisteModal from '../../arbeidsliste/arbeidsliste-modal';
import HuskelappRedigereModal from '../../huskelapp/redigering/huskelapp-redigere-modal';
import HuskelappRedigereMedArbeidslisteModal from '../../huskelapp/redigering/huskelapp-redigere-med-arbeidsliste-modal';
import HuskelappVisningModal from '../../huskelapp/visning/huskelapp-visning-modal';
import {HuskelappMedArbeidslisteVisningModal} from '../../huskelapp/visning/huskelapp-visning-med-arbeidsliste-modal';
import HuskelappFjernModal from '../../huskelapp/redigering/huskelapp-fjern-modal';

export function VeilederverktoyModalController() {
    const { activeModalState } = useModalStore();

    if (!activeModalState) {
        return null;
    }

    switch (activeModalState.type) {
        case ModalType.START_ESKALERING:
            return <StartEskalering />;
        case ModalType.ARBEIDSLISTE:
            return <ArbeidslisteModal />;
        case ModalType.FJERN_ARBEIDSLISTE:
            return <FjernArbeidslisteModal />;
        case ModalType.TILDEL_VEILEDER:
            return <TildelVeileder />;
        case ModalType.TILDEL_VEILEDER_FEILET:
            return <FeilTildelingModal />;
        case ModalType.TILDEL_VEILEDER_KVITTERING:
            return <TildelVeilederKvittering {...(activeModalState.props as TildelVeilederKvitteringProps)} />;
        case ModalType.START_ESKALERING_KVITTERING:
            return <StartEskaleringKvittering />;
        case ModalType.START_MANUELL_OPPFOLGING:
            return <StarManuellOppfolging />;
        case ModalType.START_MANUELL_KVITTERING:
            return (
                <StartManuellOppfolgingKvittering
                    {...(activeModalState.props as StartManuellOppfolgingKvitteringProps)}
                />
            );
        case ModalType.START_DIGITAL_OPPFOLGING:
            return <StartDigitalOppfolging />;
        case ModalType.START_DIGITAL_OPPFOLING_KVITTERIG:
            return (
                <StartDigitalOppfolgingKvittering
                    {...(activeModalState.props as StartDigitalOppfolgingKvitteringProps)}
                />
            );
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
            return <AvsluttOppfolgingBekreft {...(activeModalState.props as AvsluttOppfolgingBekreftelseModalProps)} />;
        case ModalType.AVSLUTT_OPPFOLGING_KVITTERING:
            return <AvsluttOppfolgingKvittering />;
        case ModalType.STOPP_ESKALERING:
            return <StoppEskalering />;
        case ModalType.STOPP_ESKALERING_KVITTERING:
            return <StopEskaleringKvittering />;
        case ModalType.HISTORIKK:
            return <Historikk />;
        case ModalType.FEIL_I_VEILEDERVERKTOY:
            return <FeilModal />;
        case ModalType.SPINNER:
            return <LasterModal />;
        case ModalType.HUSKELAPP:
            return <HuskelappVisningModal />;
        case ModalType.HUSKELAPP_REDIGERE:
            return <HuskelappRedigereModal />;
        case ModalType.HUSKELAPP_REDIGERE_MED_ARBEIDSLISTE:
            return <HuskelappRedigereMedArbeidslisteModal />;
        case ModalType.HUSKELAPP_MED_ARBEIDSLISTE:
            return <HuskelappMedArbeidslisteVisningModal />;
        case ModalType.FJERN_HUSKELAPP:
            return <HuskelappFjernModal />;
        default:
            return null;
    }
}
