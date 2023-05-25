import React from 'react';
import { opprettetAvTekst } from './opprettet-av';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { OppgaveHistorikkInnslag } from '../../../../api/veilarboppgave';
import {BodyLong, BodyShort, Heading} from "@navikt/ds-react";

interface OwnProps {
    oppgaveHistorikk: OppgaveHistorikkInnslag;
}

const oppgaveTemaTekst = {
    INDIVIDSTONAD: 'Individstønad (Tiltakspenger)',
    DAGPENGER: 'Dagpenger',
    OPPFOLGING: 'Oppfølging',
    ARBEIDSAVKLARING: 'Arbeidsavklaringspenger',
    ENSLIG_FORSORGER: 'Enslig forsørger',
    TILLEGGSTONAD: 'Tilleggsstønad'
};

const oppgaveTypetekst = {
    VURDER_HENVENDELSE: 'Vurder henvendelse',
    VURDER_KONSEKVENS_FOR_YTELSE: 'Vurder konsekvens for ytelse'
};

function OppgaveHistorikkKomponent({ oppgaveHistorikk }: OwnProps) {
    const { oppgaveTema, oppgaveType } = oppgaveHistorikk;
    return (
        <div className="historikk__elem blokk-xs">
            <Heading level="2">Gosys-oppgave opprettet</Heading>
            <BodyShort>
                {`Oppgave med tema ${oppgaveTemaTekst[oppgaveTema]} og type ${oppgaveTypetekst[oppgaveType]} opprettet`}
            </BodyShort>
            <BodyLong>
                {`${toSimpleDateStr(oppgaveHistorikk.dato)} ${opprettetAvTekst(
                    oppgaveHistorikk.opprettetAv,
                    oppgaveHistorikk.opprettetAvBrukerId,
                    oppgaveHistorikk.opprettetAvBrukerNavn
                )}`}
            </BodyLong>
        </div>
    );
}

export default OppgaveHistorikkKomponent;
