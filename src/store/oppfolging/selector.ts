import { Appstate } from '../../types/appstate';
import TilgangTilKontorSelector from '../tilgang-til-brukerskontor/selector';
import { EskaleringsVarsel, Oppfolging } from '../../types/oppfolging';
import { OrNothing } from '../../types/utils/ornothing';

export interface OppfolgingSelector {
    selectOppfolgingStatus: (state: Appstate) => boolean;
    selectErUnderOppfolging: (state: Appstate) => boolean;
    selectKanStarteDigitalOppfolging: (state: Appstate) => boolean;
    selectKanStarteManuellOppfolging: (state: Appstate) => boolean;
    selectKanOppretteOppgave: (state: Appstate) => boolean;
    selectErKRR: (state: Appstate) => boolean;
    selectFnr: (state: Appstate) => string;
    selectKanSendeEskaleringsVarsel: (state: Appstate) => boolean;
    selectKanStoppeEskaleringsVarsel: (state: Appstate) => boolean;
    selectErIkkeArbeidssoker: (state: Appstate) => boolean;
    selectKanStarteKVP: (state: Appstate) => boolean;
    selectKanStoppeKVP: (state: Appstate) => boolean;
    selectKanAvslutteOppfolging: (state: Appstate) => boolean;
    selectKanReaktiveres: (state: Appstate) => boolean;
    selectErSykmeldtMedArbeidsgiver: (state: Appstate) => boolean;
}

function selectOppfolgingData(state: Appstate): Oppfolging {
    return state.oppfolging.data;
}

function selectErUnderOppfolging (state: Appstate): boolean {
    return selectOppfolgingData(state).underOppfolging;
}

function selectKanReaktiveres (state: Appstate): boolean {
    return !!selectOppfolgingData(state).kanReaktiveras;
}

function selectOppfolgingStatus(state: Appstate): boolean {
    const oppfolgingStatus = state.oppfolging.status;
    return oppfolgingStatus === 'NOT_STARTED' || oppfolgingStatus === 'LOADING';
}

function selectFnr(state: Appstate): string {
    return selectOppfolgingData(state).fnr;
}
function selectErManuell(state: Appstate): boolean {
    return selectOppfolgingData(state).manuell;
}

function selectErKRR (state: Appstate): boolean {
    return selectOppfolgingData(state).reservarsjonKRR;
}

function selectKVP(state: Appstate): boolean {
    return selectOppfolgingData(state).underKvp;
}

function selectKanStarteManuellOppfolging(state: Appstate): boolean {
    return (
        TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        !selectErManuell(state)
    );
}

function selectGjeldeneEskaleringsVarsel(state: Appstate): OrNothing<EskaleringsVarsel> {
    return selectOppfolgingData(state).gjeldeneEskaleringsvarsel;
}

function selectKanStarteDigitalOppfolging(state: Appstate): boolean {
    return (
        TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        selectErManuell(state)
    );
}

function selectKanSendeEskaleringsVarsel (state: Appstate): boolean {
    return(
        TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        !selectGjeldeneEskaleringsVarsel(state) &&
        !selectErKRR(state) &&
        !selectErManuell(state)
    );
}

function selectKanStoppeEskaleringsVarsel (state: Appstate): boolean {
    return(
        TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        !!selectGjeldeneEskaleringsVarsel(state) &&
        !selectErKRR(state) &&
        !selectErManuell(state)
    );
}

function selectKanOppretteOppgave(state: Appstate): boolean {
    return selectErUnderOppfolging(state);
}

function selectKanStarteKVP(state: Appstate): boolean {
    return TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        !selectKVP(state);
}

function selectKanStoppeKVP(state: Appstate): boolean {
    return TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) &&
        selectErUnderOppfolging(state) &&
        selectKVP(state);
}

function selectKanAvslutteOppfolging(state: Appstate): boolean {
    return TilgangTilKontorSelector.selectHarTilgangTilKontoret(state) && selectErUnderOppfolging(state);
}

function selectErIkkeArbeidssoker (state: Appstate): boolean {
    return !selectOppfolgingData(state).underOppfolging && !selectOppfolgingData(state).kanReaktiveras;
}

function selectErSykmeldtMedArbeidsgiver (state: Appstate): boolean {
    return !!selectOppfolgingData(state).erSykmeldtMedArbeidsgiver;
}

export default {
    selectOppfolgingStatus,
    selectKanStarteManuellOppfolging,
    selectKanStarteDigitalOppfolging,
    selectKanOppretteOppgave,
    selectFnr,
    selectErKRR,
    selectKanSendeEskaleringsVarsel,
    selectKanStoppeEskaleringsVarsel,
    selectErIkkeArbeidssoker,
    selectKanStarteKVP,
    selectKanStoppeKVP,
    selectKanAvslutteOppfolging,
    selectErUnderOppfolging,
    selectKanReaktiveres,
    selectErSykmeldtMedArbeidsgiver
}as OppfolgingSelector;