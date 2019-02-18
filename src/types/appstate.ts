import {OppfogingState} from "../store/oppfolging/reducer";
import {OppfolgingStatusState} from "../store/oppfolging-status/reducer";
import {PersonaliaState} from "../store/personalia/reducer";
import {ArbeidslisteState} from "../store/arbeidsliste/reducer";
import {DialogState} from "../store/dialog/reducer";
import {NavigationState} from "../store/navigation/reducer";
import {TildelVeilederState} from "../store/tildel-veileder/reducer";


export interface Appstate {
    oppfolging: OppfogingState,
    oppfolgingstatus: OppfolgingStatusState,
    personalia: PersonaliaState,
    arbeidsliste: ArbeidslisteState,
    dialog: DialogState,
    navigation: NavigationState,
    tildelVeileder: TildelVeilederState,
}