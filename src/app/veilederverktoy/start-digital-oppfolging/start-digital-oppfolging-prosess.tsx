import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface StartDigitalOppfolgingProsessProps {
    navigerTilStartDigitalOppfolging: () => void;
}

function StartDigitalOppfolgingProsess({ navigerTilStartDigitalOppfolging }: StartDigitalOppfolgingProsessProps) {
    return (
        <StartProsess
            knappeTekst="Endre til digital oppfølging"
            onClick={navigerTilStartDigitalOppfolging}
            metricName="veilarbvisittkortfs.metrikker.digital"
        />
    );
}

export default StartDigitalOppfolgingProsess;
