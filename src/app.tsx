import PersonInfo from './component/personinfo/personinfo';
import { Veilederverktoy } from './component/veilederverktoy/veilederverktoy';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import StoreProvider from './store/store-provider';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import './index.less';
import './index.css';
import { useSetAppState } from './store/app-store';
import { useEffect } from 'react';
import { VisittKortConfigContext } from './store/visittkort-config';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
}

function App({ fnr, enhet, tilbakeTilFlate, visVeilederVerktoy, skjulEtiketter }: AppProps) {
    const setAppstate = useSetAppState();
    useEffect(() => {
        setAppstate({ brukerFnr: fnr, enhetId: enhet });
    }, [fnr, enhet, setAppstate]);

    return (
        <VisittKortConfigContext.Provider
            value={{
                visVeilederVerktoy: visVeilederVerktoy || false,
                tilbakeTilFlate
            }}
        >
            <StoreProvider>
                <div className="visittkortfs">
                    <DataFetcher>
                        {brukerFnr => (
                            <>
                                <Tilbakelenke />
                                <div className="visittkortfs__container">
                                    <PersonInfo brukerFnr={brukerFnr} />
                                    {!skjulEtiketter && <Etiketter brukerFnr={brukerFnr} />}
                                    <Veilederverktoy />
                                </div>
                            </>
                        )}
                    </DataFetcher>
                    <VeilederverktoyModalController />
                </div>
            </StoreProvider>
        </VisittKortConfigContext.Provider>
    );
}

export default App;
