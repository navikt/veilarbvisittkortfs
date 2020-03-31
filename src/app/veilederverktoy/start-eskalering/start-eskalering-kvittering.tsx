import React from 'react';
import Kvittering from '../prosess/kvittering';
import moment from 'moment';
import { Appstate } from '../../../types/appstate';
import { useSelector } from 'react-redux';
import { StringOrNothing } from '../../../types/utils/stringornothings';

function formatter(format: string, dato: string): string | undefined {
    const datoVerdi = moment(dato);
    return datoVerdi.isValid() ? datoVerdi.format(format) : undefined;
}

export function formaterDatoKortManed(dato: StringOrNothing) {
    if (dato) {
        return formatter('Do MMM YYYY', dato);
    }
    return undefined;
}

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
