import { StringOrNothing } from './utils/stringornothings';

export interface TildelVeilederData {
    fraVeilederId: StringOrNothing;
    tilVeilederId: string;
    brukerFnr: string;
}

export interface TildelVeilederResponse {
    resultat: string;
    feilendeTilordninger: TildelVeilederData[];
    tilVeilederId: StringOrNothing;
}
