import React from 'react';
import Kvittering from '../prosess/kvittering';
import moment from 'moment';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { StringOrNothing } from '../../../../types/utils/stringornothings';

function formatter(format: string, dato: string): string| undefined {
    const datoVerdi = moment(dato);
    return datoVerdi.isValid() ? datoVerdi.format(format) : undefined;
}

export function formaterDatoKortManed(dato: StringOrNothing) {
    if (dato) {
        return formatter('Do MMM YYYY', dato);
    }
    return undefined;
}

interface StateProps {
    dato: StringOrNothing;
}

function StartEskaleringKvittering({dato}: StateProps) {
    return(
        <Kvittering
            tittelId="innstillinger.modal.start-eskalering.overskrift"
            alertStripeTekstId="innstillinger.modal.start-eskalering.kvittering"
            alertStripeTekstValues={{ dato: formaterDatoKortManed(dato) }}
        />
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    dato: state.oppfolging.data.gjeldendeEskaleringsvarsel && state.oppfolging.data.gjeldendeEskaleringsvarsel.opprettetDato
});

export default connect<StateProps>(mapStateToProps)(StartEskaleringKvittering);