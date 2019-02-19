import React, { useState } from 'react';
import { Arbeidsliste } from '../../../types/arbeidsliste';
import { Knapp } from 'nav-frontend-knapper';
import ArbeidslisteIkon from './arbeidsliste.svg';
import FjernArbeidsliste from './fjern-arbeidsliste';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import LeggTilArbeidsliste from './legg-til-arbeidsliste';
import RedigerArbeidsliste from './rediger-arbeidsliste';
import { Dispatch } from 'redux';
import { slettArbeidsliste } from '../../../store/arbeidsliste/actions';

interface StateProps {
    arbeidsliste: Arbeidsliste;
    fnr: string;
    navn: string;
}

interface DispatchProps {
    doSlettArbeidsliste: (fnr: string) => void;
}

type ArbeidslisteStateProps = StateProps & DispatchProps;

function Arbeidslistekomponent (props: ArbeidslisteStateProps) {
    const [leggTilArbeidsliste, setLeggTilArbeidslisteAktivt] = useState( false);
    const [fjernArbeidsliste, setFjernArbeidslisteAktivt] = useState( false);
    const [visKommentar, setVisKommentarAktivt] = useState( false);

    if (!props.arbeidsliste.harVeilederTilgang) {
        return <div/>;
    }

    if (!props.arbeidsliste.endringstidspunkt) {
        return(
            <>
                <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setLeggTilArbeidslisteAktivt(true)}>
                    <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                    Legg til i arbeidsliste
                </Knapp>
                <LeggTilArbeidsliste
                    isOpen={leggTilArbeidsliste}
                    onRequestClose={() => setLeggTilArbeidslisteAktivt(false)}
                    arbeidsliste={props.arbeidsliste}
                    fnr={props.fnr}
                    navn={props.navn}
                />
            </>
        );
    }
    return (
        <>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setFjernArbeidslisteAktivt(true)}>
                <img src={ArbeidslisteIkon} alt="Fjern fra arbeidsliste"/>
                <span>Fjern</span>
            </Knapp>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={() => setVisKommentarAktivt(true)}>
                <span>Vis kommentar</span>
            </Knapp>
            <RedigerArbeidsliste
                isOpen={visKommentar}
                onRequestClose={() => setVisKommentarAktivt(false)}
                arbeidsliste={props.arbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
            />
            <FjernArbeidsliste
                isOpen={fjernArbeidsliste}
                onRequestClose={() => setFjernArbeidslisteAktivt(false)}
                onBekreft={props.doSlettArbeidsliste}
                fnr={props.fnr}
                navn={props.navn}
            />
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    arbeidsliste: state.arbeidsliste.data,
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    navn: PersonaliaSelectors.selectSammensattNavn(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
   doSlettArbeidsliste : (fnr: string) => dispatch(slettArbeidsliste(fnr))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Arbeidslistekomponent);