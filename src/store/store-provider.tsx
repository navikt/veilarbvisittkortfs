import React from 'react';
import { DataStore } from './data-store';
import { ModalStore } from './modal-store';
import { AppStore, AppStoreInitialValues } from './app-store';

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
            <DataStore>
                <ModalStore>{props.children}</ModalStore>
            </DataStore>
        </AppStore>
    );
};

export default StoreProvider;
