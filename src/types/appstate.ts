import { OppfogingState } from '../store/oppfolging/reducer';
import { OppfolgingStatusState } from '../store/oppfolging-status/reducer';
import { PersonaliaState } from '../store/personalia/reducer';
import { ArbeidslisteState } from '../store/arbeidsliste/reducer';
import { DialogState } from '../store/dialog/reducer';
import { NavigationState } from '../store/navigation/reducer';
import { TildelVeilederState } from '../store/tildel-veileder/reducer';
import { TilgangTilBrukersKontorState } from '../store/tilgang-til-brukerskontor/reducer';
import { InnstillingsHistorikkState } from '../store/innstillingshistorikk/reducer';
import { OppgaveHistorikkState } from '../store/oppgave/reducer';
import { EnhetState } from '../store/enhet/reducer';
import { AvsluttOppfolgingState } from '../store/avslutningstatus/reducer';
import { ToastType } from '../app/components/toast/toast';

export interface Appstate {
    oppfolging: OppfogingState;
    oppfolgingstatus: OppfolgingStatusState;
    personalia: PersonaliaState;
    arbeidsliste: ArbeidslisteState;
    dialoger: DialogState;
    tildelVeileder: TildelVeilederState;
    tilgangTilBrukersKontor: TilgangTilBrukersKontorState;
    instillingshistorikk: InnstillingsHistorikkState;
    oppgavehistorikk: OppgaveHistorikkState;
    enhetId: EnhetState;
    avsluttOppfolgingStatus: AvsluttOppfolgingState;
    ui: {
        navigation: NavigationState;
        toasts: {toasts: ToastType[]},
    };
}