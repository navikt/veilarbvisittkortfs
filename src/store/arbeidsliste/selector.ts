import { Appstate } from '../../types/appstate';
import {Arbeidsliste} from "../../types/arbeidsliste";
import {OrNothing} from "../../types/utils/ornothing";

export interface ArbeidslisteSelector {
    selectArbeidslisteStatus: (state: Appstate) => boolean;
    selectKanLeggeIArbeidsListe: (state: Appstate) => boolean;
    selectKanFjerneArbeidsliste: (state: Appstate) => boolean;
    selectKanRedigereArbeidsliste: (state: Appstate) => boolean;
}

function selectArbeidslisteStatus(state: Appstate): boolean {
    const arbeidslisteStatus = state.arbeidsliste.status;
    return arbeidslisteStatus === 'NOT_STARTED' || arbeidslisteStatus === 'LOADING';
}

function selectArbeidslisteData(state: Appstate): Arbeidsliste {
    return state.arbeidsliste.data;
}

function selectEndringsPunkt(state: Appstate): OrNothing<Date> {
    return selectArbeidslisteData(state).endringstidspunkt;
}

function selectErOppfolgendeVeileder(state: Appstate): boolean {
    return selectArbeidslisteData(state).isOppfolgendeVeileder;
}

function selectHarVeilederTilgang(state: Appstate): boolean {
    return selectArbeidslisteData(state).harVeilederTilgang;
}

function selectKanLeggeIArbeidsListe(state: Appstate): boolean {
    const endringstidspunkt = selectEndringsPunkt(state);
    const erOppfolgingsVeileder = selectErOppfolgendeVeileder(state);
    return !endringstidspunkt && erOppfolgingsVeileder;
}

function selectKanFjerneArbeidsliste (state: Appstate): boolean {
    const endringstidspunkt = selectEndringsPunkt(state);
    const erOppfolgingsVeileder = selectErOppfolgendeVeileder(state);
    return !!endringstidspunkt && erOppfolgingsVeileder;
}

function selectKanRedigereArbeidsliste (state: Appstate): boolean {
    const endringstidspunkt = selectEndringsPunkt(state);
    const harVeilederTilgang = selectHarVeilederTilgang(state);
    return !!endringstidspunkt && harVeilederTilgang;
}


export default {
    selectArbeidslisteStatus,
    selectKanLeggeIArbeidsListe,
    selectKanFjerneArbeidsliste,
    selectKanRedigereArbeidsliste
}as ArbeidslisteSelector;