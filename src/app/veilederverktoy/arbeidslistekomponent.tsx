import React, {useState} from "react";
import {Arbeidsliste} from "../../types/arbeidsliste";
import {Knapp} from "nav-frontend-knapper";
import ArbeidslisteIkon from './arbeidsliste.svg';
import ArbeidslisteForm from "./arbeidsliste-form";
import hiddenIf from "../components/hidden-if";
import FjernArbeidsliste from "./fjern-arbeidsliste";


function Arbeidslistekomponent (arbeidsliste: Arbeidsliste) {
    const [leggTilArbeidsliste, setLeggTilArbeidslisteAktivt] = useState( false);
    const [fjernArbeidsliste, setFjernArbeidslisteAktivt] = useState( false);
    const [visKommentar, setVisKommentarAktivt] = useState( false);
    if(!arbeidsliste.endringstidspunkt){
        return(
            <>
                <Knapp className="arbeidsliste__knapp" htmlType="button" onClick={()=> setLeggTilArbeidslisteAktivt(true)}>
                    <img src={ArbeidslisteIkon} alt="Legg til i arbeidsliste"/>
                    <span>Legg til i arbeidsliste</span>
                </Knapp>
                <ArbeidslisteForm
                    isOpen={leggTilArbeidsliste}
                    onRequestClose={()=> setLeggTilArbeidslisteAktivt(false)}
                    arbeidsliste={arbeidsliste}
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
                arbeidsliste={arbeidsliste}
            />
            <FjernArbeidsliste
               isOpen={fjernArbeidsliste}
               onRequestClose={()=> setFjernArbeidslisteAktivt(false)}
            />
        </>
    )
}

export default hiddenIf(Arbeidslistekomponent);