import React, {useEffect, useState} from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import './veilederverktoy.less';
import Arbeidslistekomponent from "./arbeidslistekomponent";
import TannHjulIkon from './tannhjul.svg';
import {Arbeidsliste} from "../../types/arbeidsliste";


const initArbeidsliste: Arbeidsliste = {
    arbeidslisteAktiv: null,
    endringstidspunkt: null,
    frist: null,
    harVeilederTilgang: true,
    isOppfolgendeVeileder: true,
    kommentar: null,
    overskrift: null,
    sistEndretAv: null,
    veilederId: null,
};

function Veilederverktoyslinje(props: {fnr: string}){
    const [arbeidsliste, setArbeidsliste] = useState(initArbeidsliste);

    const fetchArbeidslisteData = async ()=> {
        const response: Response = await fetch(
            `/veilarbportefolje/api/arbeidsliste/${props.fnr}?fnr=${props.fnr}`);
        const arbeidsliste = await response.json();
        setArbeidsliste(arbeidsliste);
    };

    useEffect(()=> {
        try{
            fetchArbeidslisteData();
        }
        catch(e){
            throw new Error(e);
        }}

    ,[]);

        return (
            <div className="veilederverktoyslinje">
                <div className="veilederverktoyslinje__container">
                    <Arbeidslistekomponent
                        hidden={!arbeidsliste.isOppfolgendeVeileder}
                        {...arbeidsliste}
                    />
                    <button>Tildel veileder</button>
                    <Hovedknapp className="veilederverktoy_knapp">
                        <span>Veilederverktoy</span>
                        <img src={TannHjulIkon} alt="Veilederverktoy"/>
                    </Hovedknapp>
                </div>
            </div>
        );
}

export default Veilederverktoyslinje;