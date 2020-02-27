import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface OwnProps {
    navigerTilStartKvpPeriode: () => void;
}

function StartKvpPeriodeProsess({ navigerTilStartKvpPeriode }: OwnProps) {
    return <StartProsess knappeTekst="Start KVP-periode" onClick={navigerTilStartKvpPeriode} />;
}

export default StartKvpPeriodeProsess;
