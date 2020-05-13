import React from 'react';
import Kvittering from '../prosess/kvittering';
import { dispatchOppfolgingAvslutet } from '../../utils/utils';

function AvsluttOppfolgingKvittering() {
    return (
        <Kvittering
            tittel="Avslutt oppfølging fra NAV"
            alertStripeTekst="Oppfølgingsperioden er nå avsluttet."
            onRequestClose={dispatchOppfolgingAvslutet}
        />
    );
}

export default AvsluttOppfolgingKvittering;
