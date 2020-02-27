import React from 'react';
import StartProsess from '../prosess/start-prosess';

export function ArbeidslisteProcess(props: { navigerTilArbeidsliste: () => void; knappeTekst: string }) {
    return (
        <StartProsess
            knappeTekst={props.knappeTekst}
            onClick={props.navigerTilArbeidsliste}
            metricName="visittkort-arbeidsliste"
        />
    );
}
