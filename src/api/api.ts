import {fetchToJson} from "./api-utils";


export function fetchPersonaliaData (fnr: string) {
    return fetchToJson(`/veilarbperson/api/person/${fnr}`);
};

export function fetchOppfolgingsstatusData(fnr: string) {
   return fetchToJson (`/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`);
};

export function fetchArbeidslisteData(fnr: string) {
    return fetchToJson(`/veilarbportefolje/api/arbeidsliste/${fnr}?fnr=${fnr}`);
}