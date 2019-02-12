import {StringOrNothing} from "./utils/stringornothings";

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