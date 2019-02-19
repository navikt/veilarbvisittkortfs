import React from 'react';
import PersonInfo from './app/personinfo/personinfo';
import Veilederverktoyslinje from './app/veilederverktoy/veiledervertoyslinje';
import Tilbakelenke from './app/tilbakelenke';
import './index.less';
import AppProvider from './app-provider';

export interface AppProps {
    fnr: string;
    enhet?: string;
}

class App extends React.Component<AppProps> {
    render() {
        return (
            <AppProvider fnr={this.props.fnr}>
                <div className="visittkortfs">
                    <Tilbakelenke enhet={this.props.enhet}/>
                    <div className="visittkortfs__container">
                        <PersonInfo/>
                        <Veilederverktoyslinje fnr={this.props.fnr}/>
                    </div>
                </div>
            </AppProvider>

        );
    }
}

export default App;