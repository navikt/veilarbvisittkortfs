import React from 'react';
import Kvittering from '../prosess/kvittering';

function StartKVPKvittering() {
	return (
		<Kvittering
			tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
			alertStripeTekst="Du har startet en KVP-periode for brukeren. Bare veiledere i din enhet har nå tilgang til dialoger, aktiviteter og mål som blir opprettet i KVP-perioden."
		/>
	);
}

export default StartKVPKvittering;
