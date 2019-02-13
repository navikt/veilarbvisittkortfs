import {fetchToJson, postAsJson} from "./api-utils";
import {TildelVeilederProps} from "../veilederverktoy/tildel-veileder/tildel-veileder";

export function hentVeieldereForEnhet(enhetid:string) {
    return fetchToJson(`/veilarbveileder/api/enhet/${enhetid}/veiledere`);
}

export function hentVeieldere() {
    return fetchToJson('/veilarbveileder/api/veileder/me');
}

export function tildelTilVeileder(fnr:string, tilordninger: TildelVeilederProps[]) {
    return postAsJson(`/veilarboppfolging/api/tilordneveileder?fnr=${fnr}`, tilordninger)
        .then(json => {
            const feil = json.feilendeTilordninger;
            if (feil && feil.length > 0) {
                const error = new Error('TILDEL-VEILEDER/FEILET');
                throw error;
            }
            return json;
        });
}