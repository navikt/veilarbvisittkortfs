import React from 'react';
import Kvittering from '../prosess/kvittering';
import { OrNothing } from '../../../util/type/ornothing';
import { OppgaveTema, OppgaveType } from '../../../api/veilarboppgave';

export interface OpprettOppgaveKvitteringProps {
    tema: OrNothing<OppgaveTema>;
    type: OrNothing<OppgaveType>;
}

function OpprettOppgaveKvittering({ tema, type }: OpprettOppgaveKvitteringProps) {
    return (
        <Kvittering
            tittel="Opprett en Gosys-oppgave"
            alertStripeTekst={`Oppgave med tema ${tema} av type ${type} er opprettet.`}
            kvitteringId="opprett-oppgave-kvittering"
        />
    );
}

export default OpprettOppgaveKvittering;
