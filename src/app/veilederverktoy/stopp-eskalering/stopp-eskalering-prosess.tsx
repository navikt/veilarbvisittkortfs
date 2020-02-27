import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface StoppEskaleringsProsessProps {
    navigerTilStoppEskalering: () => void;
}

function StoppEskaleringsProsess({ navigerTilStoppEskalering }: StoppEskaleringsProsessProps) {
    return (
        <StartProsess
            knappeTekst="Deaktiver varsel"
            onClick={navigerTilStoppEskalering}
            metricName="veilarbvisittkortfs.metrikker.deaktiver_esklaring"
        />
    );
}
export default StoppEskaleringsProsess;
