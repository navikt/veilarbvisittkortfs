import {StringOrNothing} from "./utils/stringornothings";

export interface AvslutningStatus {
    harTiltak: boolean;
    harYtelser: boolean;
    inaktiveringsDato: StringOrNothing;
    kanAvslutte: boolean;
    underKvp: boolean;
    underOppfolging: boolean;
}
