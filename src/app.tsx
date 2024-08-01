import PersonInfo from './component/personinfo/personinfo';
import Veilederverktoylinje from './component/veilederverktoy/veilederverktoylinje';
import Etiketter from './component/personinfo/components/etiketter';
import Tilbakelenke from './component/components/tilbakelenke/tilbakelenke';
import StoreProvider from './store/store-provider';
import { DataFetcher } from './component/data-fetcher';
import { VeilederverktoyModalController } from './component/veilederverktoy/veilederverktoy-components/veilederverktoy-modal-controller';
import './index.less';

export interface AppProps {
    fnr: string;
    enhet?: string;
    tilbakeTilFlate: string;
    visVeilederVerktoy?: boolean;
    skjulEtiketter?: boolean;
    avsluttOppfolgingOpptelt?: boolean;
}

function App({ fnr, enhet, tilbakeTilFlate, visVeilederVerktoy, skjulEtiketter, avsluttOppfolgingOpptelt }: AppProps) {
    return (
        <StoreProvider
            brukerFnr={fnr}
            enhetId={enhet}
            tilbakeTilFlate={tilbakeTilFlate}
            visVeilederVerktoy={visVeilederVerktoy || false}
            avsluttOppfolgingOpptelt={avsluttOppfolgingOpptelt || false}
        >
            <div className="visittkortfs">
                <DataFetcher>
                    <Tilbakelenke />
                    <div className="visittkortfs__container">
                        <PersonInfo />
                        {!skjulEtiketter && <Etiketter />}
                        <Veilederverktoylinje />
                    </div>
                </DataFetcher>
                <VeilederverktoyModalController />
            </div>
        </StoreProvider>
    );
}

export default App;
