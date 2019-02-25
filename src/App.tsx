import React from 'react';
import PersonInfo from './app/personinfo/personinfo';
import Veilederverktoyslinje from './app/veilederverktoy/veiledervertoyslinje';
import Tilbakelenke from './app/tilbakelenke';
import './index.less';
import AppProvider from './app-provider';
import momentImpl from 'moment';
import 'moment-timezone';
import 'moment/locale/nb';

momentImpl.locale('nb');
momentImpl.tz.setDefault('Europe/Oslo');

export const moment = momentImpl;

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