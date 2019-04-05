import { ToastType } from '../../app/components/toast/toast';
import { Dispatch } from 'redux';
import { Appstate } from '../../types/appstate';

export enum ToastActionType {
    VIS_TOAST = 'VIS_TOAST',
    FJERN_TOAST = 'FJERN_TOAST'
}

export interface ToastAction {
    type: ToastActionType;
    toast: ToastType;
}

export const visToast = (tekst: string, className?: string): ToastAction => ({
    type: ToastActionType.VIS_TOAST,
    toast: {
        timestamp: Date.now(),
        tekst,
        className
    }
});

export const fjernToast = (toast: ToastType): ToastAction => ({
    type: ToastActionType.FJERN_TOAST,
    toast
});

export const showSuccessToast = (tekst: string) => (dispatch: Dispatch, getState: Appstate): void => {
    const toastAction = visToast(tekst, 'success');
    dispatch(visToast(tekst, 'success'));
    setTimeout(() => dispatch(fjernToast(toastAction.toast)), 3500);
};
