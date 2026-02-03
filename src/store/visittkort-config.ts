import { createContext, useContext } from 'react';

export interface VisittkortConfig {
    tilbakeTilFlate: string;
    visVeilederVerktoy: boolean;
}

export const VisittKortConfigContext = createContext<VisittkortConfig>({
    tilbakeTilFlate: '',
    visVeilederVerktoy: true
});

export const useTilbakeTilFlate = () => useContext(VisittKortConfigContext).tilbakeTilFlate;
export const useVisVeilederVerktøy = () => useContext(VisittKortConfigContext).visVeilederVerktoy;
