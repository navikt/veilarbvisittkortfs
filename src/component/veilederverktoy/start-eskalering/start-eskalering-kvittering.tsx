import React from 'react';
import Kvittering from '../prosess/kvittering';
import { Appstate } from '../../../types/appstate';
import { useSelector } from 'react-redux';
import { formaterDatoKortManed } from '../../../util/date-utils';

function StartEskaleringKvittering() {
    const dato = useSelector(
        (state: Appstate) =>
            state.oppfolging.data.gjeldendeEskaleringsvarsel &&
            state.oppfolging.data.gjeldendeEskaleringsvarsel.opprettetDato
    );

    if (!dato) {
        return null;
    }

    return (
        <Kvittering
            tittel="Send varsel til brukeren"
            alertStripeTekst={`Varselet er sendt til brukeren ${formaterDatoKortManed(
                dato
            )} på sms med lenke til aktivitetsplanen`}
        />
    );
}

export default StartEskaleringKvittering;
