import { fetchToJson } from './api-utils';

export function fetchPersonaliaData(fnr: string) {
    return fetchToJson(`/veilarbperson/api/person/${fnr}`);
}

export function fetchInnloggetNiva4Data(fnr: string) {
    return fetchToJson(`/veilarbperson/api/person/${fnr}/harNivaa4`);
}

export function fetchOppfolgingsstatusData(fnr: string) {
    return fetchToJson(`/veilarboppfolging/api/person/${fnr}/oppfolgingsstatus`);
}
