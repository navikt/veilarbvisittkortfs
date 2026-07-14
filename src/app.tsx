import PersonInfo from './component/personinfo/personinfo';
import { Veilederverktoy } from './component/veilederverktoy/veilederverktoy';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import './index.less';
import './index.css';
import { useSetAppState } from './store/app-store';
import { useEffect, useMemo, useState } from 'react';
import { VisittKortConfigContext } from './store/visittkort-config';
import { FeilIVisittkortAlert } from './component/FeilIVisittkortAlert';
import { Switch, Theme } from '@navikt/ds-react';
import { DARKMODE_VISITTKORT_TOGGLE, useFeaturesFromOboUnleash } from './api/veilarbpersonflatefs';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
}

function App({ fnr, enhet, tilbakeTilFlate, visVeilederVerktoy, skjulEtiketter }: AppProps) {
    const setAppstate = useSetAppState();
    const [darkMode, setDarkMode] = useState(false);
    const { features } = useFeaturesFromOboUnleash();
    const visDarkModeToggle = features?.[DARKMODE_VISITTKORT_TOGGLE] ?? false;

    useEffect(() => {
        setAppstate({ brukerFnr: fnr, enhetId: enhet });
    }, [fnr, enhet, setAppstate]);

    const configValue = useMemo(() => {
        return {
            visVeilederVerktoy: visVeilederVerktoy || false,
            tilbakeTilFlate
        };
    }, [visVeilederVerktoy, tilbakeTilFlate]);

    return (
        <VisittKortConfigContext.Provider value={configValue}>
            <div>
                <Theme asChild theme={darkMode ? 'dark' : 'light'}>
                    <div className="visittkortfs">
                        <DataFetcher>
                            {brukerFnr => (
                                <>
                                    <Tilbakelenke />
                                    <div className="visittkortfs__container">
                                        <PersonInfo brukerFnr={brukerFnr} />
                                        {!skjulEtiketter && <Etiketter brukerFnr={brukerFnr} />}
                                        <div className="visittkortfs__actions">
                                            <Veilederverktoy />
                                            {visDarkModeToggle && (
                                                <Switch
                                                    className="visittkortfs__switch"
                                                    checked={darkMode}
                                                    onChange={() => setDarkMode(currentDarkMode => !currentDarkMode)}
                                                    size="small"
                                                >
                                                    Mørk modus
                                                </Switch>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </DataFetcher>
                        <VeilederverktoyModalController />
                    </div>
                </Theme>
                <FeilIVisittkortAlert />
            </div>
        </VisittKortConfigContext.Provider>
    );
}

export default App;
