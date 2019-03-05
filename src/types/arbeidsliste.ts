import { StringOrNothing } from './utils/stringornothings';
import { OrNothing } from './utils/ornothing';

export interface Arbeidsliste {
    arbeidslisteAktiv: StringOrNothing;
    endringstidspunkt: StringOrNothing;
    frist: OrNothing<Date>;
    harVeilederTilgang: boolean;
    isOppfolgendeVeileder: boolean;
    kommentar: StringOrNothing;
    overskrift: StringOrNothing;
    sistEndretAv: StringOrNothing;
    veilederId: StringOrNothing;
}

export interface ArbeidslisteformValues {
    kommentar: string;
    frist: string;
    overskrift: string;
}


export interface ArbeidslisteformData {
    kommentar: string;
    frist: OrNothing<Date>;
    overskrift: string;
}


export interface ArbeidslisteformDataMedFnr {
    fnr: string;
}