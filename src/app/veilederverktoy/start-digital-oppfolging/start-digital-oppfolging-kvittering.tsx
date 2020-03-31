import React from 'react';
import Kvittering from '../prosess/kvittering';

interface OwnProps {
    begrunnelse?: string;
}

type StartOppfolgingKvittering = OwnProps;

function StartDigitalOppfolgingKvittering({ begrunnelse }: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittel="Endre til digital oppfølging"
            alertStripeTekst="innstillinger.prosess.digital.kvittering"
            alertStripeTekstValues={{ begrunnelse }}
        />
    );
}

export default StartDigitalOppfolgingKvittering;
