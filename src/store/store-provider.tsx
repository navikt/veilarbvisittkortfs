import { ReactNode } from 'react';
import { DataStore } from './data-store';
import { ModalStore } from './modal-store';
import { AppStore, AppStoreInitialValues } from './app-store';

interface StoreProviderProps extends AppStoreInitialValues {
    children: ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <AppStore
            brukerFnr={props.brukerFnr}
            enhetId={props.enhetId}
            tilbakeTilFlate={props.tilbakeTilFlate}
            visVeilederVerktoy={props.visVeilederVerktoy}
            avsluttOppfolgingOpptelt={props.avsluttOppfolgingOpptelt}
        >
            <DataStore>
                <ModalStore>{props.children}</ModalStore>
            </DataStore>
        </AppStore>
    );
};

export default StoreProvider;
