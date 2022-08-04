import React from 'react';
import Kvittering from '../prosess/kvittering';
import { formaterDatoKortManed } from '../../../util/date-utils';

function StartEskaleringKvittering() {
    return (
        <Kvittering
            tittel="Send varsel om mulig stans til brukeren"
            alertStripeTekst={`Varselet er sendt til brukeren ${formaterDatoKortManed(
                new Date()
            )}  på sms/epost om å logge seg inn på ditt nav. Bruker vil se en brukernotefikasjon på ditt nav.`}
        />
    );
}

export default StartEskaleringKvittering;
