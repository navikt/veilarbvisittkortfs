import React from "react";
import {AlertStripeAdvarselSolid} from "nav-frontend-alertstriper";
import {AvslutningStatus} from "../../../../../types/avslutningsstatus";

function VarselStripeAvsluttOppfolging(props: AvslutningStatus) {
    console.log('props', props);
    return(
        <AlertStripeAdvarselSolid>
            <ul>
                {props.underOppfolging && <li>Brukeren har aktiv status i Arena</li>}
                {props.underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
                {props.harTiltak && <li>Brukeren har aktiva tiltak</li>}
                {props.harYtelser && <li>Brukeren har aktiva ytelser</li>}
            </ul>
        </AlertStripeAdvarselSolid>
    )
}

export default VarselStripeAvsluttOppfolging;