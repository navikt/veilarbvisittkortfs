import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface OwnProps {
    navigerTilStartManuellOppfolging: () => void;
}

function StarManuellOppfolging({ navigerTilStartManuellOppfolging }: OwnProps) {
    return <StartProsess knappeTekst="Endre til manuell oppfølging" onClick={navigerTilStartManuellOppfolging} />;
}

export default StarManuellOppfolging;
