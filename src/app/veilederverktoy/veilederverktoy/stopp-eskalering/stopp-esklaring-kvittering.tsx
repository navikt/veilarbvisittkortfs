import React from 'react';
import Kvittering from '../prosess/kvittering';

function StopEskaleringKvittering() {
    return (
        <Kvittering
            tittelId="innstillinger.modal.stopp-eskalering.overskrift"
            alertStripeTekstId="innstillinger.modal.stopp-eskalering.kvittering"
        />
    );
}

export default StopEskaleringKvittering;