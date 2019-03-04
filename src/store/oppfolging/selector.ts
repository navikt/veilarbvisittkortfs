import {Appstate} from "../../types/appstate";
import TilgangTilKontorSelector from "../tilgang-til-brukerskontor/selector";
import {Oppfolging} from "../../types/oppfolging";

export interface OppfolgingSelector {
    selectOppfolgingStatus: (state: Appstate) => boolean;
    selectKanStarteDigitalOppfolging: (state: Appstate) => boolean;
    selectKanStarteManuellOppfolging: (state: Appstate) => boolean;
    selectKanOppretteOppgave: (state: Appstate) => boolean;
}

function selectOppfolgingData(state: Appstate): Oppfolging {
    return state.oppfolging.data;
}

function selectErUnderOppfolging (state: Appstate) {
    return selectOppfolgingData(state).underOppfolging;
}

function selectOppfolgingStatus(state: Appstate): boolean {
    const oppfolgingStatus = state.oppfolging.status;
    return oppfolgingStatus === 'NOT_STARTED' || oppfolgingStatus === 'LOADING';
}

function selectErManuell(state: Appstate): boolean {
    return selectOppfolgingData(state).manuell
}

function selectKanStarteManuellOppfolging(state: Appstate): boolean {
    return (
        !TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) ||
        !selectErUnderOppfolging(state) ||
        selectErManuell(state)
    )
}

function selectKanStarteDigitalOppfolging(state: Appstate): boolean {
    return (
        !TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) ||
        !selectErUnderOppfolging(state) ||
        !selectErManuell(state)
    )
}

function selectKanOppretteOppgave(state: Appstate): boolean {
    return !selectErUnderOppfolging(state);
}

export default {
    selectOppfolgingStatus,
    selectKanStarteManuellOppfolging,
    selectKanStarteDigitalOppfolging,
    selectKanOppretteOppgave

}as OppfolgingSelector