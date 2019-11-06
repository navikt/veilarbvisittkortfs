// Actions
export const SKJUL_FEILMELDING_MODAL = 'feilmelding-modal/skjul';
export const VIS_FEILMELDING_MODAL = 'feilmelding-modal/vis';
export const VIS_MELDING_MODAL = 'melding-modal/vis';
export const SKJUL_MELDING_MODAL = 'melding-modal/skjul';

export const TILORDNING_FEILET = 'tilordningFeilet';

// Reducer
const initalState = {
    aarsak: undefined,
    brukereError: []
};
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case SKJUL_FEILMELDING_MODAL:
            return { ...initalState };
        case VIS_FEILMELDING_MODAL:
            return { ...action.data };
        case SKJUL_MELDING_MODAL:
            return { ...initalState };
        case VIS_MELDING_MODAL:
            return { ...action.data };
        default:
            return state;
    }
}

// Action Creators
export function visFeiletModal(data) {
    return (dispatch) => dispatch({
        type: VIS_FEILMELDING_MODAL,
        data
    });
}

export function skjulFeilmeldingModal() {
    return (dispatch) => dispatch({
        type: SKJUL_FEILMELDING_MODAL
    });
}

export function visMeldingModal(data) {
    return (dispatch) => dispatch({
        type: VIS_MELDING_MODAL,
        data
    });
}

export function skjulMeldingModal() {
    return (dispatch) => dispatch({
        type: SKJUL_MELDING_MODAL
    });
}
