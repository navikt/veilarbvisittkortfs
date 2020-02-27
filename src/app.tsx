import React from 'react';
import PersonInfo from './app/personinfo/personinfo';
import Veilederverktoyslinje from './app/veilederverktoy/veiledervertoyslinje';
import AppProvider from './app/app-provider';
import * as moment from 'moment';
import 'moment/locale/nb';
import './index.less';
import NavFrontendModal from 'nav-frontend-modal';
import VisittkortWrapper from './app/visittkort-wrapper';
import Etiketter from './app/personinfo/components/etiketter';
import Tilbakelenke from './app/components/tilbakelenke/tilbakelenke';
import { FeilTildelingModal } from './app/veilederverktoy/tildel-veileder/tildel-veileder-feil-modal';
import VeilederVerktoyNavigation from './app/veilederverktoy/veilederverktoy-components/veilederverktoy-navigation';
import Toasts from './app/components/toast/toasts';

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
                    <div className="visittkortfs__innhold">
                        <PersonInfo {...props} />
                        <Etiketter />
                        <Veilederverktoyslinje fnr={props.fnr} visVeilederVerktoy={props.visVeilederVerktoy} />
                        <FeilTildelingModal />
                    </div>
                    <Toasts />
                </VeilederVerktoyNavigation>
            </VisittkortWrapper>
        </AppProvider>
    );
}

export default App;
