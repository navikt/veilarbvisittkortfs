import { ReactNode } from 'react';
import { DataStore } from './data-store';
import { ModalStore } from './modal-store';

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    return (
        <DataStore>
            <ModalStore>{children}</ModalStore>
        </DataStore>
    );
};

export default StoreProvider;
