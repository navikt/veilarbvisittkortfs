import constate from 'constate';
import { useState } from 'react';

export interface AppStoreInitialValues {
    brukerFnr: string;
    enhetId?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy: boolean;
    avsluttOppfolgingOpptelt: boolean;
}

export const [AppStore, useAppStore] = constate((initalValues: AppStoreInitialValues) => {
    const [brukerFnr, setBrukerFnr] = useState<string>(initalValues.brukerFnr);
    const [enhetId, setEnhetId] = useState<string | undefined>(initalValues.enhetId);
    const [tilbakeTilFlate, setTilbakeTilFlate] = useState<string>(initalValues.tilbakeTilFlate);
    const [visVeilederVerktoy, setVisVeilederVerktoy] = useState<boolean>(initalValues.visVeilederVerktoy);
    const [avsluttOppfolgingOpptelt, setAvsluttOppfolgingOpptelt] = useState<boolean>(
        initalValues.avsluttOppfolgingOpptelt
    );

    return {
        brukerFnr,
        setBrukerFnr,
        enhetId,
        setEnhetId,
        tilbakeTilFlate,
        setTilbakeTilFlate,
        visVeilederVerktoy,
        setVisVeilederVerktoy,
        avsluttOppfolgingOpptelt,
        setAvsluttOppfolgingOpptelt
    };
});
