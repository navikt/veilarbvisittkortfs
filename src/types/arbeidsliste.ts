import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';

export interface Arbeidsliste {
    arbeidslisteAktiv: StringOrNothing;
    endringstidspunkt: StringOrNothing;
    frist: StringOrNothing;
    harVeilederTilgang: boolean;
    isOppfolgendeVeileder: boolean;
    kommentar: StringOrNothing;
    overskrift: StringOrNothing;
    sistEndretAv: StringOrNothing;
    veilederId: StringOrNothing;
}

export interface ArbeidslisteformData {
    kommentar: string;
    frist: OrNothing<Date>;
    overskrift: string;
}

export interface ArbeidslisteformDataMedFnr {
    fnr: string;
}