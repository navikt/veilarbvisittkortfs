import { fetchToJson, postAsJson } from './api-utils';
import { Oppfolging } from '../types/oppfolging';

const OPPFOLGING_BASE_URL = '/veilarboppfolging/api';

export interface OppfolgingApi {
    hentOppfolgingData: (fnr?: string) => Promise<Oppfolging>;
    startEskalering: (dialogId: string, begrunnelse: string) => Promise<void>; //TODO ELLER NOE
    hentVeilederTilgang: (fnr: string) => Promise<void>; //TODO ELLER NOE
    settManuellOppfolging: (begrunnelse: string, veilederId: string, fnr: string) => Promise<Oppfolging>; // TODO SJEKK HVA DET SKA VARA
    settDigital: (begrunnelse: string, veilederId: string, fnr: string) => Promise<Oppfolging>; // TODO SJEKK HVA DET SKA VARA
    startKvpOppfolging: (begrunnelse: string, fnr: string) => Promise<void>; // TODO SJEKK HVA DET SKA VARA
    stoppKvpOppfolging: (begrunnelse: string, fnr: string) => Promise<void>; // TODO SJEKK HVA DET SKA VARA
}

function hentOppfolgingData(fnr?: string) {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging?fnr=${fnr}`);
}

function startEskalering(dialogId: string, begrunnelse: string) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/startEskalering/`, {
        dialogId,
        begrunnelse,
    });
}

function hentVeilederTilgang(fnr: string) {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging/veilederTilgang?fnr=${fnr}`);
}

function settDigital(begrunnelse: string, veilederId: string, fnr: string) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/settDigital?fnr=${fnr}`, {
        begrunnelse,
        veilederId,
    });
}

function settManuellOppfolging(begrunnelse: string, veilederId: string, fnr: string) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/settManuell?fnr=${fnr}`, {
        begrunnelse,
        veilederId,
    });
}

function startKvpOppfolging(begrunnelse: string, fnr: string) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/startKvp?fnr=${fnr}`, {
        begrunnelse,
    });
}

export function stoppKvpOppfolging(begrunnelse: string, fnr: string) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/stoppKvp?fnr=${fnr}`, {
        begrunnelse,
    });
}

export default {
    hentOppfolgingData,
    startEskalering,
    hentVeilederTilgang,
    settManuellOppfolging,
    startKvpOppfolging,
    stoppKvpOppfolging,
    settDigital
} as OppfolgingApi;