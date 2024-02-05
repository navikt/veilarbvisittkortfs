import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoyslinje from './component/veilederverktoy/veiledervertoyslinje';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import StoreProvider from './store/store-provider';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import './index.less';
import { erProd, isLocalDevelopment } from './util/utils';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
    avsluttOppfolgingOpptelt?: boolean;
}

function App(props: AppProps) {
    return (
        <StoreProvider
            brukerFnr={props.fnr}
            enhetId={props.enhet}
            tilbakeTilFlate={props.tilbakeTilFlate}
            visVeilederVerktoy={props.visVeilederVerktoy || false}
            avsluttOppfolgingOpptelt={props.avsluttOppfolgingOpptelt || false}
        >
            <div className="visittkortfs">
                <DataFetcher>
                    <Tilbakelenke />
                    <div className="visittkortfs__container">
                        <PersonInfo />
                        {!props.skjulEtiketter && <Etiketter />}
                        <Veilederverktoyslinje />
                    </div>
                    {isLocalDevelopment() && <span style={{color: "blueviolet"}}>.</span>}
                </DataFetcher>
                <VeilederverktoyModalController />
            </div>
        </StoreProvider>
    );
}

export default App;
