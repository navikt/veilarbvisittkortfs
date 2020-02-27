import React from 'react';
import StartProsess from '../prosess/start-prosess';

interface OwnProps {
    navigerTilOpprettOppgave: () => void;
}

function OpprettOppgaveProsess({ navigerTilOpprettOppgave }: OwnProps) {
    return <StartProsess knappeTekst="Opprett Gosys-oppgave" onClick={navigerTilOpprettOppgave} />;
}

export default OpprettOppgaveProsess;
