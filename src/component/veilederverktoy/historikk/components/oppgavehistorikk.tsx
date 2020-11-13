import * as React from 'react';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';
import { OppgaveHistorikk } from '../../../../api/data/oppgave-historikk';

interface OwnProps {
    oppgaveHistorikk: OppgaveHistorikk;
}

const oppgaveTemaTekst = {
    INDIVIDSTONAD: 'Individstønad (Tiltakspenger)',
    DAGPENGER: 'Dagpenger',
    OPPFOLGING: 'Oppfølging',
    ARBEIDSAVKLARING: 'Arbeidsavklaringspenger',
    ENSLIG_FORSORGER: 'Enslig forsørger',
    TILLEGGSTONAD: 'Tilleggsstønad',
};

const oppgaveTypetekst = {
    VURDER_HENVENDELSE: 'Vurder henvendelse',
    VURDER_KONSEKVENS_FOR_YTELSE: 'Vurder konsekvens for ytelse',
};

function OppgaveHistorikkKomponent({ oppgaveHistorikk }: OwnProps) {
    const { oppgaveTema, oppgaveType } = oppgaveHistorikk;
    return (
        <div className="historikk__elem blokk-xs">
            <Element>Gosys-oppgave opprettet</Element>
            <Normaltekst>
                {`Oppgave med tema ${oppgaveTemaTekst[oppgaveTema]} og type ${oppgaveTypetekst[oppgaveType]} opprettet`}
            </Normaltekst>
            <Undertekst>
                {`${moment(oppgaveHistorikk.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(
                    oppgaveHistorikk.opprettetAv,
                    oppgaveHistorikk.opprettetAvBrukerId
                )}`}
            </Undertekst>
        </div>
    );
}

export default OppgaveHistorikkKomponent;
