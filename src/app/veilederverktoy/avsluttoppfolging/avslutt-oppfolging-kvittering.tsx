import React from 'react';
import Kvittering from '../prosess/kvittering';

function AvsluttOppfolgingKvittering() {
    return (
        <Kvittering
            tittel="Avslutt oppfølging fra NAV"
            alertStripeTekst="Oppfølgingsperioden er nå avsluttet."
            onRequestClose={window.location.reload}
        />
    );
}

export default AvsluttOppfolgingKvittering;
