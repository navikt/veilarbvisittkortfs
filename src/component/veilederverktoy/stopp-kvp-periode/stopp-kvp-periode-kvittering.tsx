import React from 'react';
import Kvittering from '../prosess/kvittering';

function StoppKVPKvittering() {
	return (
		<Kvittering
			tittel="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
			alertStripeTekst="KVP-perioden til brukeren er avsluttet. Veiledere i andre enheter har nå tilgang til dialoger, aktiviteter og mål som er opprettet før og etter KVP-perioden."
		/>
	);
}

export default StoppKVPKvittering;
