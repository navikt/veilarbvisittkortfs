import { ReactNode } from 'react';
import { ModalStore } from './modal-store';

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    return <ModalStore>{children}</ModalStore>;
};

export default StoreProvider;
