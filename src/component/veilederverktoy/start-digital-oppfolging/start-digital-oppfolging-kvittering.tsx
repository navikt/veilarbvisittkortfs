import React from 'react';
import Kvittering from '../prosess/kvittering';

export interface StartDigitalOppfolgingKvitteringProps {
    begrunnelse: string;
}

interface OwnProps {
    begrunnelse?: string;
}

type StartOppfolgingKvittering = OwnProps;

function StartDigitalOppfolgingKvittering({ begrunnelse }: StartOppfolgingKvittering) {
    return (
        <Kvittering
            tittel="Endre til digital oppfølging"
            alertStripeTekst={`Digital oppfølging er aktivert. Begrunnelse: ${begrunnelse}`}
        />
    );
}

export default StartDigitalOppfolgingKvittering;
