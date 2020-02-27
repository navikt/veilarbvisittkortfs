import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface StartEskaleringProsessProps {
    navigerTilStartEsklaring: () => void;
}

function StartEskaleringProsess({ navigerTilStartEsklaring }: StartEskaleringProsessProps) {
    return (
        <StartProsess
            knappeTekst="Send varsel"
            onClick={navigerTilStartEsklaring}
            metricName="veilarbvisittkortfs.metrikker.send_eskalering"
        />
    );
}

export default StartEskaleringProsess;
