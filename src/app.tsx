import React from 'react';
import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoyslinje from './component/veilederverktoy/veiledervertoyslinje';
import AppProvider from './component/app-provider';
import * as moment from 'moment';
import 'moment/locale/nb';
import './index.less';
import NavFrontendModal from 'nav-frontend-modal';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import VeilederVerktoyNavigation from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-navigation';
import StoreProvider from './store-midlertidig/store-provider';
import { InitialDataFetcher } from './component/initial-data-fetcher';

moment.locale('nb');

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
                        <VeilederVerktoyNavigation>
                            <PersonInfo />
                            <Etiketter />
                            <Veilederverktoyslinje />
                        </VeilederVerktoyNavigation>
                    </InitialDataFetcher>
                </div>
            </AppProvider>
        </StoreProvider>
    );
}

export default App;
