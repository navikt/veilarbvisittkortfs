export enum ToastActionType {
    VIS_TILDELT_VEILEDER_TOAST = 'VIS_TILDELT_VEILEDER_TOAST',
    FJERN_TILDET_VEILEDER_TOAST = 'FJERN_TILDELT_VEILEDER_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
}

export const toastAction = (type: ToastActionType): ToastAction => ({
    type
});

export const visFjernTildeltVeilederToast = (): ToastAction =>
    toastAction(ToastActionType.VIS_TILDELT_VEILEDER_TOAST);

export const fjernTildeltVeilederToast = (): ToastAction =>
    toastAction(ToastActionType.FJERN_TILDET_VEILEDER_TOAST);
