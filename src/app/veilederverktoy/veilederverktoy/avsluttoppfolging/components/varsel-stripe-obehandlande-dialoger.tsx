import React from 'react';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { AvslutningStatus } from '../../../../../types/oppfolging';

function VarselStripeAvsluttOppfolging(props: AvslutningStatus) {
    return(
        <AlertStripeAdvarsel>
            Du kan ikke avslutte oppfølgingsperioden fordi:
            <ul className="margin--0">
                {props.underOppfolging && <li>Brukeren har aktiv status i Arena</li>}
                {props.underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
            </ul>
        </AlertStripeAdvarsel>
    );
}

export default VarselStripeAvsluttOppfolging;