import {Appstate} from "../../types/appstate";
import VeilederSelector from "../tildel-veileder/selector";

export interface ArbeidslisteSelector {
    selectArbeidslisteStatus: (state: Appstate) => boolean;
    selectKanLeggeIArbeidsListe: (state: Appstate) => boolean;
    selectKanFjerneArbeidsliste: (state: Appstate) => boolean;
}


function selectArbeidslisteStatus(state: Appstate): boolean {
    const arbeidslisteStatus = state.arbeidsliste.status;
    return arbeidslisteStatus === 'NOT_STARTED' || arbeidslisteStatus === 'LOADING';
}

function selectKanLeggeIArbeidsListe(state: Appstate): boolean {
    const endringstidspunkt = state.arbeidsliste.data.endringstidspunkt;
    const erOppfolgingsVeileder = VeilederSelector.selectErOppfolgingsVeileder(state);
    return !endringstidspunkt && erOppfolgingsVeileder;
}

function selectKanFjerneArbeidsliste (state: Appstate): boolean {
    const endringstidspunkt = state.arbeidsliste.data.endringstidspunkt;
    const erOppfolgingsVeileder = VeilederSelector.selectErOppfolgingsVeileder(state);
    return !!endringstidspunkt && erOppfolgingsVeileder;
}

export default {
    selectArbeidslisteStatus,
    selectKanLeggeIArbeidsListe,
    selectKanFjerneArbeidsliste
}as ArbeidslisteSelector