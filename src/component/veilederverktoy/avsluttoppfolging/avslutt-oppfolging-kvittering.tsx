import React from 'react';
import Kvittering from '../prosess/kvittering';

function AvsluttOppfolgingKvittering() {
    return (
        <Kvittering
            tittel="Avslutt oppfølging fra NAV"
            alertStripeTekst="Oppfølgingsperioden er nå avsluttet."
            onRequestClose={window.location.reload.bind(window.location)}
            kvitteringId="avslutt-oppfolging-kvittering"
        />
    );
}

export default AvsluttOppfolgingKvittering;
