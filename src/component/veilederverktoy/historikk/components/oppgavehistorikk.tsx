import React from 'react';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { opprettetAvTekst } from './opprettet-av';
import { toSimpleDateStr } from '../../../../util/date-utils';
import { OppgaveHistorikk } from '../../../../api/veilarboppgave';

interface OwnProps {
	oppgaveHistorikk: OppgaveHistorikk;
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
			<Element>Gosys-oppgave opprettet</Element>
			<Normaltekst>
				{`Oppgave med tema ${oppgaveTemaTekst[oppgaveTema]} og type ${oppgaveTypetekst[oppgaveType]} opprettet`}
			</Normaltekst>
			<Undertekst>
				{`${toSimpleDateStr(oppgaveHistorikk.dato)} ${opprettetAvTekst(
					oppgaveHistorikk.opprettetAv,
					oppgaveHistorikk.opprettetAvBrukerId
				)}`}
			</Undertekst>
		</div>
	);
}

export default OppgaveHistorikkKomponent;
