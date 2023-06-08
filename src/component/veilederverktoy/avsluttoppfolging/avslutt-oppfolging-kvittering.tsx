import React from 'react';
import Kvittering from '../prosess/kvittering';
import { logMetrikk } from '../../../util/logger';
import { useAppStore } from '../../../store/app-store';

function AvsluttOppfolgingKvittering() {
    const { avsluttOppfolgingOpptelt, setAvsluttOppfolgingOpptelt } = useAppStore();

    if (!avsluttOppfolgingOpptelt) {
        logMetrikk(`veilarbvisittkortfs.metrikker.Avslutt oppfolging_bekreftet`);
        setAvsluttOppfolgingOpptelt(true);
    }
    return (
        <Kvittering
            tittel="Avslutt oppfølging fra NAV"
            alertStripeTekst="Oppfølgingsperioden er nå avsluttet."
            onRequestClose={window.location.reload.bind(window.location)}
        />
    );
}

export default AvsluttOppfolgingKvittering;
