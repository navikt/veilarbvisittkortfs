import { storeForbokstaver } from './utils';
import { Dialog } from '../api/veilarbdialog';
import { Oppfolging, OppfolgingStatus, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { Personalia } from '../api/veilarbperson';
import { Arbeidsliste } from '../api/veilarbportefolje';
import { VeilederData } from '../api/veilarbveileder';
import { OrNothing } from './type/ornothing';

export function selectSammensattNavn(personalia: Personalia | undefined): string {
    if (!personalia) return '';
    const { fornavn, mellomnavn, etternavn } = personalia;
    return storeForbokstaver([fornavn, mellomnavn || '', etternavn]);
}

export function selectKanLeggeIArbeidsListe(
    innloggetVeileder: OrNothing<VeilederData>,
    oppfolgingsstatus: OrNothing<OppfolgingStatus>,
    arbeidsliste?: Arbeidsliste
): boolean {
    if (!innloggetVeileder || !arbeidsliste || !oppfolgingsstatus) return false;
    return arbeidsliste?.endringstidspunkt == null && oppfolgingsstatus.veilederId === innloggetVeileder.ident;
}

export function selectKanRedigereArbeidsliste(arbeidsliste?: Arbeidsliste): boolean {
    return !!arbeidsliste?.endringstidspunkt && arbeidsliste?.harVeilederTilgang;
}

export function kanRegistreresEllerReaktiveres(oppfolging: OrNothing<Oppfolging>): boolean {
    if (!oppfolging) return false;
    const underOppfolging = oppfolging.underOppfolging;
    const kanReaktiveres = !!oppfolging.kanReaktiveres;
    return (underOppfolging && kanReaktiveres) || (!underOppfolging && !kanReaktiveres);
}

export function selectHarUbehandledeDialoger(dialoger: Dialog[]): boolean {
    return dialoger.filter(dialog => !dialog.historisk && (!dialog.ferdigBehandlet || dialog.venterPaSvar)).length > 0;
}

export function lagVeilederSammensattNavn(veileder: VeilederData): string {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

export function kanFjerneArbeidsliste(
    arbeidsliste: Arbeidsliste,
    oppfolging: OrNothing<Oppfolging>,
    innloggetVeilederId: OrNothing<string>
): boolean {
    return !!arbeidsliste.endringstidspunkt && !!innloggetVeilederId && oppfolging?.veilederId === innloggetVeilederId;
}

export function selectKanSendeEskaleringsVarsel(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        !oppfolging.gjeldendeEskaleringsvarsel &&
        !oppfolging.reservasjonKRR &&
        !oppfolging.manuell
    );
}

export function selectKanStoppeEskaleringsVarsel(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        !!oppfolging.gjeldendeEskaleringsvarsel &&
        !oppfolging.reservasjonKRR &&
        !oppfolging.manuell
    );
}

export function selectKanAvslutteOppfolging(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging;
}

export function selectKanStarteManuellOppfolging(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && !oppfolging.manuell;
}

export function selectKanStarteDigitalOppfolging(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && oppfolging.manuell;
}

export function selectKanStarteKVP(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && !oppfolging.underKvp;
}

export function selectKanStoppeKVP(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && oppfolging.underKvp;
}

export function selectKanEndreArbeidsliste(arbeidsliste?: Arbeidsliste): boolean {
    return !!arbeidsliste?.endringstidspunkt && !!arbeidsliste?.harVeilederTilgang;
}

export function selectKanTildeleVeileder(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return oppfolging.underOppfolging && tilgangTilBrukersKontor.tilgangTilBrukersKontor;
}
