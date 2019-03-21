import React from 'react';
import Kvittering from '../prosess/kvittering';

interface OwnProps {
    begrunnelse?: string;
}

type StartOppfolgingKvittering = OwnProps;

function StartManuellOppfolgingKvittering({begrunnelse}: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittelId="innstillinger.modal.manuell.overskrift"
            alertStripeTekstId="innstillinger.prosess.manuell.kvittering"
            alertStripeTekstValues={{begrunnelse}}

        />
    );
}

export default StartManuellOppfolgingKvittering;