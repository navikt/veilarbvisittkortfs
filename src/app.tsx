import React from 'react';
import PersonInfo from "./app/personinfo/personinfo";
import Veilederverktoyslinje from "./app/veilederverktoy/veiledervertoyslinje";
import Tilbakelenke from "./app/tilbakelenke";
import "./index.less";

export interface AppProps {
    fnr: string;
    enhet?: string;
}

class App extends React.Component<AppProps> {
    render() {
        return (
            <div className="visittkortfs">
                <Tilbakelenke enhet={this.props.enhet}/>
                <div className="visittkortfs__container">
                    <PersonInfo fnr={this.props.fnr}/>
                    <Veilederverktoyslinje/>
                </div>
            </div>
        );
    }
}

export default App;