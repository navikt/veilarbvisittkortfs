import React from 'react';
import { ToastType, useToastStore } from '../../store-midlertidig/toast-store';
import FjernTildelVeilederToast, { FjernTildelVeilederToastProps } from './toast/fjern-tildel-veileder-toast';

export function ToastController() {
    const { activeToastState } = useToastStore();

    if (!activeToastState) {
        return null;
    }

    switch (activeToastState.type) {
        case ToastType.FJERN_TILDEL_VEILEDER:
            return <FjernTildelVeilederToast {...(activeToastState.props as FjernTildelVeilederToastProps)} />;
        default:
            return null;
    }
}
