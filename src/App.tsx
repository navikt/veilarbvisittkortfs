import React from 'react';
import { Provider } from 'react-redux';
import PersonInfo from "./app/personinfo/personinfo";
import Veilederverktoyslinje from "./app/veilederverktoy/veiledervertoyslinje";
import Tilbakelenke from "./app/tilbakelenke";
import "./index.less";
import InitialDataProvider from "./app/components/initialdataprovider";
import store from "./store/store";

export interface AppProps {
    fnr: string;
    enhet?: string;
}

class App extends React.Component<AppProps> {
    render() {
        return (
            <Provider store={store}>
                <div className="visittkortfs">
                    <Tilbakelenke enhet={this.props.enhet}/>
                    <div className="visittkortfs__container">
                        <InitialDataProvider fnr={this.props.fnr}>
                            <PersonInfo/>
                            <Veilederverktoyslinje fnr={this.props.fnr}/>
                        </InitialDataProvider>
                    </div>
                </div>
            </Provider>
        );
    }
}

export default App;