import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';

export interface Arbeidsliste {
    arbeidslisteAktiv: StringOrNothing; //TODO WHAT IS ZIS?
    endringstidspunkt: OrNothing<Date>;
    frist: OrNothing<Date>;
    harVeilederTilgang: boolean;
    isOppfolgendeVeileder: boolean;
    kommentar: StringOrNothing;
    overskrift: StringOrNothing;
    sistEndretAv: OrNothing<{ veilederId: string }>;
    kategori: KategoriModell | null;
    veilederId?: StringOrNothing;
}

export interface ArbeidslisteformValues {
    kommentar: StringOrNothing;
    frist: StringOrNothing;
    overskrift: StringOrNothing;
    kategori: KategoriModell | null;
}

export enum KategoriModell {
    BLA = 'BLA',
    LILLA = 'LILLA',
    GRONN = 'GRONN',
    GUL = 'GUL',
    TOM = 'TOM',
}
