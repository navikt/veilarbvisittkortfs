import React from 'react';
import PersonInfo from './app/personinfo/personinfo';
import Veilederverktoyslinje from './app/veilederverktoy/veiledervertoyslinje';
import AppProvider from './app/app-provider';
import * as moment from 'moment';
import 'moment/locale/nb';
import './index.less';
import NavFrontendModal from 'nav-frontend-modal';
import VisittkortWrapper from './app/visittkort-wrapper';

moment.locale('nb');

NavFrontendModal.setAppElement(document.getElementById('modal-a11y-wrapper'));

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
}

function App (props: AppProps) {
    return (
        <AppProvider fnr={props.fnr}>
            <VisittkortWrapper {...props}>
                <PersonInfo fnr={props.fnr}/>
                <Veilederverktoyslinje
                    fnr={props.fnr}
                    enhet={props.enhet}
                    visVeilederVerktoy={props.visVeilederVerktoy}
                />
            </VisittkortWrapper>
        </AppProvider>

    );
}

export default App;
