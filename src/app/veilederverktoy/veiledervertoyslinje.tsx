import * as React from 'react';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import ArbeidslisteIkon from './arbeidsliste.svg';
import './veilederverktoy.less';

interface VeiledervertoyslinjeState {
    leggTilIAbreidsListe: boolean;
    tildelVeileder: boolean;
    verktoy: boolean;
}

class Veilederverktoyslinje extends React.Component<{}, VeiledervertoyslinjeState> {
    constructor (props: {}) {
      super(props);
      this.state = {
          leggTilIAbreidsListe: false,
          tildelVeileder: false,
          verktoy: false,
      };
      this.onCloseModalClick = this.onCloseModalClick.bind(this);
    }

    onCloseModalClick() {
        this.setState({leggTilIAbreidsListe: false});
    }

    render() {
        return (
            <div className="veilederverktoyslinje">
                <div className="veilederverktoyslinje__container">
                    <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => this.setState({leggTilIAbreidsListe: true})}>
                        <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                        <span>Legg til i arbeidsliste</span>
                    </Knapp>
                    <button>Tildel veileder</button>
                    <Hovedknapp className="arbeidsliste">Veilederverktoy</Hovedknapp>
                    <LeggTilArbeidsliste
                        isOpen={this.state.leggTilIAbreidsListe}
                        onCloseModalClick={this.onCloseModalClick}
                    />
                </div>
            </div>
        );
    }
}

export default Veilederverktoyslinje;