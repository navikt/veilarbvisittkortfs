import { storeForbokstaver } from './utils';
import { Dialog, GjeldendeEskaleringsvarsel } from '../api/veilarbdialog';
import { Oppfolging, TilgangTilBrukersKontor } from '../api/veilarboppfolging';
import { Personalia } from '../api/veilarbperson';
import { Huskelapp } from '../api/veilarbportefolje';
import { VeilederData } from '../api/veilarbveileder';
import { OrNothing, StringOrNothing } from './type/utility-types';

export function selectSammensattNavn(personalia: Personalia | undefined): string {
    if (!personalia) return '';
    const { fornavn, mellomnavn, etternavn } = personalia;
    return storeForbokstaver([fornavn, mellomnavn || '', etternavn]);
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

// TODO Skal vi kanskje ta i bruk denne på om slette-knapp skal visast eller ikkje? 2024-11-04, Ingrid
export function kanFjerneHuskelapp(
    huskelapp: Huskelapp,
    oppfolging: OrNothing<Oppfolging>,
    innloggetVeilederId: OrNothing<string>
): boolean {
    return !!huskelapp.endretDato && !!innloggetVeilederId && oppfolging?.veilederId === innloggetVeilederId;
}

export function selectKanSendeEskaleringsVarsel(
    oppfolging: OrNothing<Oppfolging>,
    gjeldendeEskaleringsvarsel: OrNothing<GjeldendeEskaleringsvarsel>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        gjeldendeEskaleringsvarsel == null &&
        !oppfolging.reservasjonKRR &&
        !oppfolging.manuell
    );
}

export function selectKanStoppeEskaleringsVarsel(
    oppfolging: OrNothing<Oppfolging>,
    gjeldendeEskaleringsvarsel: OrNothing<GjeldendeEskaleringsvarsel>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        gjeldendeEskaleringsvarsel != null &&
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

export function selectKanTildeleVeileder(
    oppfolging: OrNothing<Oppfolging>,
    tilgangTilBrukersKontor: OrNothing<TilgangTilBrukersKontor>
): boolean {
    if (!oppfolging || !tilgangTilBrukersKontor) return false;
    return oppfolging.underOppfolging && tilgangTilBrukersKontor.tilgangTilBrukersKontor;
}

export function selectTelefonnummer(personalia: Personalia | undefined): StringOrNothing {
    const telefonEntries = personalia?.telefon ?? [];
    // Filtrer bort tomme telefonnumre og sorter på prioritet, velger det med lavest prioritet
    return telefonEntries
        .filter(tlfEntry => tlfEntry.telefonNr)
        .sort((a, b) => Number(a.prioritet) - Number(b.prioritet))[0]?.telefonNr;
}
