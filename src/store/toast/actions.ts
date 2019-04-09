export enum ToastActionType {
    VIS_ARBEIDSLISTE_TOAST = 'VIS_ARBEIDSLISTE_TOAST',
    FJERN_ARBEIDSLISTE_TOAST = 'FJERN_ARBEIDSLISTE_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
}

export const toastAction = (type: ToastActionType): ToastAction => ({
    type
});

export const visFjernArbeidslisteToast = (): ToastAction =>
    toastAction(ToastActionType.VIS_ARBEIDSLISTE_TOAST);

export const fjernArbeidslisteToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_ARBEIDSLISTE_TOAST);