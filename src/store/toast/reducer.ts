import { ToastAction, ToastActionType } from './actions';
import { ToastType } from '../../app/components/toast/toast';

export interface ToastState {
    toasts: ToastType[];
}

const initialState: ToastState = {
    toasts: []
};

type ActionType = ToastAction | { type: '' };

export const toastReducer = (state: ToastState = initialState, action: ActionType): ToastState => {
    switch (action.type) {
        case ToastActionType.FJERN_TOAST:
            return {
                ...state,
                toasts: state.toasts.filter((toast: ToastType) => toast.timestamp !== action.toast.timestamp)
            };
        case ToastActionType.VIS_TOAST:
            return {
                ...state,
                toasts: [...state.toasts, action.toast]
            };
        default:
            return state;
    }
};

export default toastReducer;