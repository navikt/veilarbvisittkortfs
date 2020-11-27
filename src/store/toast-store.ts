import constate from 'constate';
import { useState } from 'react';
import { FjernTildelVeilederToastProps } from '../component/components/toast/fjern-tildel-veileder-toast';

export enum ToastType {
    FJERN_TILDEL_VEILEDER = 'FJERN_TILDEL_VEILEDER',
}

export interface ToastState {
    type: ToastType;
    props?: {};
}

export const [ToastStore, useToastStore] = constate(() => {
    const [activeToastState, setActiveToastState] = useState<ToastState>();

    function showFjernTildelVeilederToast(props: FjernTildelVeilederToastProps) {
        setActiveToastState({ type: ToastType.FJERN_TILDEL_VEILEDER, props });
    }

    function hideToast() {
        setActiveToastState(undefined);
    }

    return {
        activeToastState,
        showFjernTildelVeilederToast,
        hideToast,
    };
});
