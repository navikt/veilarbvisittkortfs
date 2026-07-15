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
import { useEffect, useMemo, useState } from 'react';
import { VisittKortConfigContext } from './store/visittkort-config';
import { FeilIVisittkortAlert } from './component/FeilIVisittkortAlert';
import { Theme } from '@navikt/ds-react';

export type AppTheme = 'light' | 'dark';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
    theme?: AppTheme;
    onThemeChange?: (theme: AppTheme) => void;
}

function App({ fnr, enhet, tilbakeTilFlate, visVeilederVerktoy, skjulEtiketter, theme, onThemeChange }: AppProps) {
    const setAppstate = useSetAppState();
    const [localTheme, setLocalTheme] = useState<AppTheme>(theme ?? 'light');
    const valgtTheme = theme ?? localTheme;
    const darkMode = valgtTheme === 'dark';

    useEffect(() => {
        setAppstate({ brukerFnr: fnr, enhetId: enhet });
    }, [fnr, enhet, setAppstate]);

    const byttTheme = () => {
        const nesteTheme: AppTheme = darkMode ? 'light' : 'dark';

        if (!theme) {
            setLocalTheme(nesteTheme);
        }

        onThemeChange?.(nesteTheme);
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
                <Theme asChild theme={valgtTheme}>
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
                </Theme>
                <FeilIVisittkortAlert />
            </div>
        </VisittKortConfigContext.Provider>
    );
}

export default App;
