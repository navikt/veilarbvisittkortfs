import { storeForbokstaver } from './utils';
import { Personalia } from '../api/data/personalia';
import { Arbeidsliste } from '../api/data/arbeidsliste';
import { VeilederData } from '../api/data/veilederdata';
import { OppfolgingStatus } from '../api/data/oppfolging-status';
import { Oppfolging } from '../api/data/oppfolging';

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
