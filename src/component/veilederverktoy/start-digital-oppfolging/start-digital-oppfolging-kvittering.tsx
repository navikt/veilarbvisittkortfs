import React from 'react';
import Kvittering from '../prosess/kvittering';

export interface StartDigitalOppfolgingKvitteringProps {
	begrunnelse: string;
}

function StartDigitalOppfolgingKvittering({ begrunnelse }: StartDigitalOppfolgingKvitteringProps) {
	return (
		<Kvittering
			tittel="Endre til digital oppfølging"
			alertStripeTekst={`Digital oppfølging er aktivert. Begrunnelse: ${begrunnelse}`}
		/>
	);
}

export default StartDigitalOppfolgingKvittering;
