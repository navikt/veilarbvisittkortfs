import React from 'react';
import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoyslinje from './component/veilederverktoy/veiledervertoyslinje';
import AppProvider from './component/app-provider';
import NavFrontendModal from 'nav-frontend-modal';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import StoreProvider from './store-midlertidig/store-provider';
import { InitialDataFetcher } from './component/initial-data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import './index.less';
import { ToastController } from './component/components/toast-controller';

NavFrontendModal.setAppElement(document.getElementById('modal-a11y-wrapper'));

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
}

function App(props: AppProps) {
    return (
        <StoreProvider
            brukerFnr={props.fnr}
            enhetId={props.enhet}
            tilbakeTilFlate={props.tilbakeTilFlate}
            visVeilederVerktoy={props.visVeilederVerktoy || false}
        >
            <AppProvider fnr={props.fnr} enhet={props.enhet}>
                <div className="visittkortfs">
                    <InitialDataFetcher>
                        <Tilbakelenke />
                        <div className="visittkortfs__container">
                            <PersonInfo />
                            <Etiketter />
                            <Veilederverktoyslinje />
                        </div>
                        <VeilederverktoyModalController />
                        <ToastController />
                    </InitialDataFetcher>
                </div>
            </AppProvider>
        </StoreProvider>
    );
}

export default App;
