import React from 'react';
import PersonInfo from './app/personinfo/personinfo';
import Veilederverktoyslinje from './app/veilederverktoy/veiledervertoyslinje';
import Tilbakelenke from './app/components/tilbakelenke/tilbakelenke';
import AppProvider from './app-provider';
import * as moment from 'moment';
import 'moment/locale/nb';
import './index.less';
import NavFrontendModal from 'nav-frontend-modal';

moment.locale('nb');

NavFrontendModal.setAppElement(document.getElementById("modal-a11y-wrapper"));

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate:string;
    visVeilederVerktoy?: boolean;
}

class App extends React.Component<AppProps> {
    render() {
        return (
            <AppProvider fnr={this.props.fnr}>
                <div className="visittkortfs">
                    <Tilbakelenke
                        enhet={this.props.enhet}
                        fnr={this.props.fnr}
                        tilbakeTilFlate={this.props.tilbakeTilFlate}
                    />
                    <div className="visittkortfs__container">
                        <PersonInfo fnr={this.props.fnr}/>
                        <Veilederverktoyslinje
                            fnr={this.props.fnr}
                            enhet={this.props.enhet}
                            visVeilederVerktoy={this.props.visVeilederVerktoy}
                        />
                    </div>
                </div>
            </AppProvider>

        );
    }
}

export default App;
