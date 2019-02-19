import { fetchToJson, postAsJson } from './api-utils';
import { Oppfolging } from '../types/oppfolging';

const OPPFOLGING_BASE_URL = '/veilarboppfolging/api';

export interface OppfolgingApi {
    hentOppfolgingData: (fnr?: string) => Promise<Oppfolging>;
    startEskalering: (dialogId: string, begrunnelse: string) => Promise<void>; //TODO ELLER NOE
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

export default {
    hentOppfolgingData,
    startEskalering
} as OppfolgingApi;