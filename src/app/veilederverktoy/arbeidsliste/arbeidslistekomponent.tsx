import React, {useState} from "react";
import {Arbeidsliste} from "../../../types/arbeidsliste";
import {Knapp} from "nav-frontend-knapper";
import ArbeidslisteIkon from './arbeidsliste.svg';
import ArbeidslisteForm from "./arbeidsliste-form";
import FjernArbeidsliste from "./fjern-arbeidsliste";
import {connect} from "react-redux";
import {Appstate} from "../../../types/appstate";

interface ArbeidslisteStateProps {
    arbeidsliste: Arbeidsliste
}


function Arbeidslistekomponent (props:{arbeidsliste: Arbeidsliste}) {
    const [leggTilArbeidsliste, setLeggTilArbeidslisteAktivt] = useState( false);
    const [fjernArbeidsliste, setFjernArbeidslisteAktivt] = useState( false);
    const [visKommentar, setVisKommentarAktivt] = useState( false);

    if(!props.arbeidsliste.harVeilederTilgang){
        return <div/>
    }

    if(!props.arbeidsliste.endringstidspunkt){
        return(
            <>
                <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={()=> setLeggTilArbeidslisteAktivt(true)}>
                    <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                    Legg til i arbeidsliste
                </Knapp>
                <ArbeidslisteForm
                    isOpen={leggTilArbeidsliste}
                    onRequestClose={()=> setLeggTilArbeidslisteAktivt(false)}
                    arbeidsliste={props.arbeidsliste}
                    innholdstittel="Legg i arbeidsliste"
                />
            </>
        )
    }
    return (
        <>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={()=> setFjernArbeidslisteAktivt(true)}>
                <img src={ArbeidslisteIkon} alt="Fjern fra arbeidsliste"/>
                <span>Fjern</span>
            </Knapp>
            <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={()=> setVisKommentarAktivt(true)}>
                <span>Vis kommentar</span>
            </Knapp>
            <ArbeidslisteForm
                isOpen={visKommentar}
                onRequestClose={()=> setLeggTilArbeidslisteAktivt(false)}
                arbeidsliste={props.arbeidsliste}
                innholdstittel="Rediger"
            />
            <FjernArbeidsliste
               isOpen={fjernArbeidsliste}
               onRequestClose={()=> setFjernArbeidslisteAktivt(false)}
            />
        </>
    )
}

const mapStateToProps = (state: Appstate): ArbeidslisteStateProps =>({
   arbeidsliste: state.arbeidsliste.data
});


export default connect<ArbeidslisteStateProps>(mapStateToProps)(Arbeidslistekomponent);