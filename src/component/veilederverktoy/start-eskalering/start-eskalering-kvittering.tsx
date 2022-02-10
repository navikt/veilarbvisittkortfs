import React from 'react';
import Kvittering from '../prosess/kvittering';
import { formaterDatoKortManed } from '../../../util/date-utils';

function StartEskaleringKvittering() {
	return (
		<Kvittering
			tittel="Send varsel til brukeren"
			alertStripeTekst={`Varselet er sendt til brukeren ${formaterDatoKortManed(
				new Date()
			)} på sms med lenke til aktivitetsplanen`}
		/>
	);
}

export default StartEskaleringKvittering;
