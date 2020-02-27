import StartProsess from '../prosess/start-prosess';
import React from 'react';

export function HistorikKnapp(props: { navigerTilHistorikk: () => void }) {
    return (
        <StartProsess
            knappeTekst="Vis historikk"
            onClick={props.navigerTilHistorikk}
            metricName="veilarbvisittkortfs.metrikker.historikk"
        />
    );
}
