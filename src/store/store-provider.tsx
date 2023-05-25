import React from 'react';
import { DataStore } from './data-store';
import { ModalStore } from './modal-store';
import { AppStore, AppStoreInitialValues } from './app-store';
import { ToastStore } from './toast-store';

interface StoreProviderProps extends AppStoreInitialValues {
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <AppStore
            brukerFnr={props.brukerFnr}
            enhetId={props.enhetId}
            tilbakeTilFlate={props.tilbakeTilFlate}
            visVeilederVerktoy={props.visVeilederVerktoy}
        >
            <ToastStore>
                <DataStore>
                    <ModalStore>{props.children}</ModalStore>
                </DataStore>
            </ToastStore>
        </AppStore>
    );
};

export default StoreProvider;
