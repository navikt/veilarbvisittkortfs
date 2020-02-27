import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface OwnProps {
    navigerTilStopKvpPeriode: () => void;
}

function StoppKvpPeriodeProsess({ navigerTilStopKvpPeriode }: OwnProps) {
    return (
        <StartProsess
            knappeTekst="Avslutt KVP-periode"
            onClick={navigerTilStopKvpPeriode}
            metricName="veilarbvisittkortfs.metrikker.stopp_kvp"
        />
    );
}

export default StoppKvpPeriodeProsess;
