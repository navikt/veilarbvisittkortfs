import { fetchToJson, postAsJson } from './api-utils';

export const OPPFOLGING_BASE_URL = '/veilarboppfolging/api';

export function hentIdentitet() {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging/me`);
}

export function settDigital() {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/settDigital`);
}

export function hentOppfolgingData(fnr) {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging?fnr=${fnr}`);
}

export function startOppfolging() {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/startOppfolging`);
}

export function startEskalering(dialogId, begrunnelse) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/startEskalering/`, {
        dialogId,
        begrunnelse
    });
}

export function stoppEskalering(begrunnelse) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/stoppEskalering/`, {
        begrunnelse
    });
}

export function kanAvslutte() {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging/avslutningStatus`);
}

export function avsluttOppfolging(begrunnelse, veilederId) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/avsluttOppfolging`, {
        begrunnelse,
        veilederId
    });
}

export function settManuellOppfolging(begrunnelse, veilederId) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/settManuell`, {
        begrunnelse,
        veilederId
    });
}

export function settDigitalOppfolging(begrunnelse, veilederId) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/settDigital`, {
        begrunnelse,
        veilederId
    });
}

export function startKvpOppfolging(begrunnelse) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/startKvp`, {
        begrunnelse
    });
}

export function stoppKvpOppfolging(begrunnelse) {
    return postAsJson(`${OPPFOLGING_BASE_URL}/oppfolging/stoppKvp`, {
        begrunnelse
    });
}

export function hentVeilederTilgang() {
    return fetchToJson(`${OPPFOLGING_BASE_URL}/oppfolging/veilederTilgang`);
}
