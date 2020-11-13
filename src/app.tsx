import React from 'react';
import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoyslinje from './component/veilederverktoy/veiledervertoyslinje';
import AppProvider from './component/app-provider';
import * as moment from 'moment';
import 'moment/locale/nb';
import './index.less';
import NavFrontendModal from 'nav-frontend-modal';
import VisittkortWrapper from './component/visittkort-wrapper';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import VeilederVerktoyNavigation from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-navigation';

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
        <AppProvider fnr={props.fnr} enhet={props.enhet}>
            <VisittkortWrapper>
                <Tilbakelenke enhet={props.enhet} fnr={props.fnr} tilbakeTilFlate={props.tilbakeTilFlate} />
                <VeilederVerktoyNavigation>
                    <PersonInfo {...props} />
                    <Etiketter />
                    <Veilederverktoyslinje visVeilederVerktoy={props.visVeilederVerktoy} />
                </VeilederVerktoyNavigation>
            </VisittkortWrapper>
        </AppProvider>
    );
}

export default App;
