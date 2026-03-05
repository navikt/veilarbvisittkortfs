import { create } from 'zustand';

interface AppStoreActions {
    setBrukerFnr: (brukerFnr: string) => void;
    setEnhetId: (enhetId: string) => void;
    setAvsluttOppfolgingOpptelt: (erOpptelt: boolean) => void;
    setAppState: (state: { enhetId: string | undefined; brukerFnr: string | undefined }) => void;
}

export interface AppStoreState {
    brukerFnr?: string;
    enhetId?: string;
    avsluttOppfolgingOpptelt: boolean;
}

type AppStore = AppStoreState & AppStoreActions;

/**
 * Fields in the AppStore are expected to possibly be changed by the visittkort-app itself unlike VisittkortConfig which is only configured from the outside
 */
export const useAppStore = create<AppStore>()(set => ({
    brukerFnr: undefined,
    enhetId: undefined,
    avsluttOppfolgingOpptelt: false,
    /* Setters */
    setBrukerFnr: (brukerFnr: string) => set({ brukerFnr: brukerFnr }),
    setEnhetId: (enhetId: string) => set({ enhetId: enhetId }),
    setAvsluttOppfolgingOpptelt: (erOpptelt: boolean) => set({ avsluttOppfolgingOpptelt: erOpptelt }),
    setAppState: state =>
        set({
            brukerFnr: state.brukerFnr,
            enhetId: state.enhetId
        })
}));

export const useBrukerFnr = () => useAppStore((state: AppStore) => state.brukerFnr);
export const useEnhetIdValgtIModiaContextHolder = () => useAppStore((state: AppStore) => state.enhetId);
export const useAvsluttOppfolgingOpptelt = () => useAppStore((state: AppStore) => state.avsluttOppfolgingOpptelt);
export const useSetAvsluttOppfolgingOpptelt = () => useAppStore(state => state.setAvsluttOppfolgingOpptelt);
export const useSetAppState = () => useAppStore(state => state.setAppState);
