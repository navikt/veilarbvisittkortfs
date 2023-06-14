import React from 'react';
import Kvittering from '../prosess/kvittering';
import { logMetrikk } from '../../../util/logger';

function AvsluttOppfolgingKvittering() {
    logMetrikk(`veilarbvisittkortfs.metrikker.Avslutt_oppfolging_bekreftet`);
    return (
        <Kvittering
            tittel="Avslutt oppfølging fra NAV"
            alertStripeTekst="Oppfølgingsperioden er nå avsluttet."
            onRequestClose={window.location.reload.bind(window.location)}
        />
    );
}

export default AvsluttOppfolgingKvittering;
