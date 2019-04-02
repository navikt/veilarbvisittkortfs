import React from 'react';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { AvslutningStatus } from '../../../../../types/oppfolging';
import { OrNothing } from '../../../../../types/utils/ornothing';

function VarselStripeAvsluttOppfolging(props: {avslutningStatus: OrNothing<AvslutningStatus>}) {
    if (!props.avslutningStatus) {
        return null;
    }
    const {underOppfolging, underKvp} = props.avslutningStatus;
    return(
        <AlertStripeAdvarselSolid>
            Du kan ikke avslutte oppfølgingsperioden fordi:
            <ul className="margin--0">
                {underOppfolging && <li>Brukeren har aktiv status i Arena</li>}
                {underKvp && <li>Brukeren deltar i på KVP. KVP må avsluttes først.</li>}
            </ul>
        </AlertStripeAdvarselSolid>
    );
}

export default VarselStripeAvsluttOppfolging;