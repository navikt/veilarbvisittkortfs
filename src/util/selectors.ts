import { storeForbokstaver } from './utils';
import { Personalia } from '../api/data/personalia';
import { Arbeidsliste } from '../api/data/arbeidsliste';
import { VeilederData } from '../api/data/veilederdata';
import { OppfolgingStatus } from '../api/data/oppfolging-status';
import { Oppfolging } from '../api/data/oppfolging';
import Dialog from '../api/data/dialog';
import { TilgangTilBrukersKontor } from '../api/data/tilgangtilbrukerskontor';

export function selectSammensattNavn(personalia: Personalia): string {
    const { fornavn, mellomnavn, etternavn } = personalia;
    return storeForbokstaver([fornavn, mellomnavn || '', etternavn]);
}

// TODO: Husk å sette veilederId på oppfølging hvis man tildeler brukeren seg selv
export function selectKanLeggeIArbeidsListe(
    innloggetVeileder: VeilederData,
    oppfolgingsstatus: OppfolgingStatus,
    arbeidsliste?: Arbeidsliste
): boolean {
    return arbeidsliste?.endringstidspunkt == null && oppfolgingsstatus.veilederId === innloggetVeileder.ident;
}

export function selectKanRedigereArbeidsliste(arbeidsliste?: Arbeidsliste): boolean {
    return !!arbeidsliste?.endringstidspunkt && arbeidsliste?.harVeilederTilgang;
}

export function kanRegistreresEllerReaktiveres(oppfolging: Oppfolging): boolean {
    const underOppfolging = oppfolging.underOppfolging;
    const kanReaktiveres = !!oppfolging.kanReaktiveres;
    return (underOppfolging && kanReaktiveres) || (!underOppfolging && !kanReaktiveres);
}

export function selectHarUbehandledeDialoger(dialoger: Dialog[]): boolean {
    return (
        dialoger.filter((dialog) => !dialog.historisk && (!dialog.ferdigBehandlet || dialog.venterPaSvar)).length > 0
    );
}

export function lagVeilederSammensattNavn(veileder: VeilederData): string {
    return `${veileder.etternavn}, ${veileder.fornavn}`;
}

export function kanFjerneArbeidsliste(
    arbeidsliste: Arbeidsliste,
    oppfolging: Oppfolging,
    innloggetVeilederId: string
): boolean {
    return !!arbeidsliste.endringstidspunkt && oppfolging.veilederId === innloggetVeilederId;
}

export function selectKanSendeEskaleringsVarsel(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        !oppfolging.gjeldendeEskaleringsvarsel &&
        !oppfolging.reservasjonKRR &&
        !oppfolging.manuell
    );
}

export function selectKanStoppeEskaleringsVarsel(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return (
        tilgangTilBrukersKontor.tilgangTilBrukersKontor &&
        oppfolging.underOppfolging &&
        !!oppfolging.gjeldendeEskaleringsvarsel &&
        !oppfolging.reservasjonKRR &&
        !oppfolging.manuell
    );
}

export function selectKanAvslutteOppfolging(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging;
}

export function selectKanStarteManuellOppfolging(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && !oppfolging.manuell;
}

export function selectKanStarteDigitalOppfolging(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && oppfolging.manuell;
}

export function selectKanStarteKVP(oppfolging: Oppfolging, tilgangTilBrukersKontor: TilgangTilBrukersKontor): boolean {
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && !oppfolging.underKvp;
}

export function selectKanStoppeKVP(oppfolging: Oppfolging, tilgangTilBrukersKontor: TilgangTilBrukersKontor): boolean {
    return tilgangTilBrukersKontor.tilgangTilBrukersKontor && oppfolging.underOppfolging && oppfolging.underKvp;
}

export function selectKanEndreArbeidsliste(arbeidsliste?: Arbeidsliste): boolean {
    return !!arbeidsliste?.endringstidspunkt && !!arbeidsliste?.harVeilederTilgang;
}

export function selectKanTildeleVeileder(
    oppfolging: Oppfolging,
    tilgangTilBrukersKontor: TilgangTilBrukersKontor
): boolean {
    return oppfolging.underOppfolging && tilgangTilBrukersKontor.tilgangTilBrukersKontor;
}
