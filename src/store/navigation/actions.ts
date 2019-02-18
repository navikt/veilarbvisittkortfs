export enum NavigationActionTypes {
    PROSESSER = 'PROSSER',
    START_ESKALERING= 'START_ESKALERING',
    START_ESKALERING_KVITTERING = 'START_ESKALERING_KVITTERING',
    TILBAKE = 'TILBAKE',
};

interface NavigerProsesserAction {
    type: NavigationActionTypes.PROSESSER;
}

interface NavigerStartEskaleringAction {
    type: NavigationActionTypes.START_ESKALERING;
}

interface NavigerStartEskaleringKvitteringAction {
    type: NavigationActionTypes.START_ESKALERING_KVITTERING;
}

interface NavigerTilbakeAction {
    type: NavigationActionTypes.TILBAKE;
}

export function navigerTilProsesser(): NavigerProsesserAction {
    return {
        type: NavigationActionTypes.PROSESSER
    }
}

export function navigerTilStartEskalering(): NavigerStartEskaleringAction {
    return {
        type: NavigationActionTypes.START_ESKALERING
    }
}

export function navigerTilbake(): NavigerTilbakeAction {
    return {
        type: NavigationActionTypes.TILBAKE
    }
}

export type NavigationActions = NavigerProsesserAction | NavigerStartEskaleringAction | NavigerStartEskaleringKvitteringAction | NavigerTilbakeAction;