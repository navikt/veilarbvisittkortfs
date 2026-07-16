import PersonInfo from './component/personinfo/personinfo';
import { Veilederverktoy } from './component/veilederverktoy/veilederverktoy';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import { DarkModeSwitch } from './component/darkmode-switch';
import './index.less';
import './index.css';
import { useSetAppState } from './store/app-store';
import { useEffect, useMemo } from 'react';
import { VisittKortConfigContext } from './store/visittkort-config';
import { FeilIVisittkortAlert } from './component/FeilIVisittkortAlert';

export type AppTheme = 'light' | 'dark';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
    theme: AppTheme;
    onThemeChange: (theme: AppTheme) => void;
}

function App({ fnr, enhet, tilbakeTilFlate, visVeilederVerktoy, skjulEtiketter, theme, onThemeChange }: AppProps) {
    const setAppstate = useSetAppState();
    const darkMode = theme === 'dark';

    useEffect(() => {
        setAppstate({ brukerFnr: fnr, enhetId: enhet });
    }, [fnr, enhet, setAppstate]);

    const byttTheme = () => {
        onThemeChange(theme === 'dark' ? 'light' : 'dark');
    };

    const configValue = useMemo(() => {
        return {
            visVeilederVerktoy: visVeilederVerktoy || false,
            tilbakeTilFlate
        };
    }, [visVeilederVerktoy, tilbakeTilFlate]);

    return (
        <VisittKortConfigContext.Provider value={configValue}>
            <div>
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
                                        <DarkModeSwitch checked={darkMode} onChange={byttTheme} />
                                    </div>
                                </div>
                            </>
                        )}
                    </DataFetcher>
                    <VeilederverktoyModalController />
                </div>
                <FeilIVisittkortAlert />
            </div>
        </VisittKortConfigContext.Provider>
    );
}

export default App;
