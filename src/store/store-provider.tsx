import { ReactNode } from 'react';
import { DataStore } from './data-store';
import { ModalStore } from './modal-store';
import { AppStore, AppStoreInitialValues } from './app-store';

interface StoreProviderProps extends AppStoreInitialValues {
    children: ReactNode;
}

const StoreProvider = ({
    brukerFnr,
    enhetId,
    tilbakeTilFlate,
    visVeilederVerktoy,
    avsluttOppfolgingOpptelt,
    children
}: StoreProviderProps) => {
    return (
        <AppStore
            brukerFnr={brukerFnr}
            enhetId={enhetId}
            tilbakeTilFlate={tilbakeTilFlate}
            visVeilederVerktoy={visVeilederVerktoy}
            avsluttOppfolgingOpptelt={avsluttOppfolgingOpptelt}
        >
            <DataStore>
                <ModalStore>{children}</ModalStore>
            </DataStore>
        </AppStore>
    );
};

export default StoreProvider;
