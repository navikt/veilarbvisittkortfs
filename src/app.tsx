import React from 'react';
import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoyslinje from './component/veilederverktoy/veiledervertoyslinje';
import NavFrontendModal from 'nav-frontend-modal';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import StoreProvider from './store/store-provider';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import { ToastController } from './component/components/toast-controller';
import './index.less';

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
            <div className="visittkortfs" data-testid="visittkortfs">
                <DataFetcher>
                    <Tilbakelenke />
                    <div className="visittkortfs__container">
                        <PersonInfo />
                        <Etiketter />
                        <Veilederverktoyslinje />
                    </div>
                </DataFetcher>
                <VeilederverktoyModalController />
                <ToastController />
            </div>
        </StoreProvider>
    );
}

export default App;
