import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import React from 'react';

function BegrunnelseOverskrift(props: { overskriftTekst: string; infoTekst?: React.ReactNode }) {
    return (
        <div className="modal-info-tekst">
            <Innholdstittel className="modal-info-tekst__overskrift">
                <FormattedMessage id={props.overskriftTekst} />
            </Innholdstittel>
            {props.infoTekst}
        </div>
    );
}

export default BegrunnelseOverskrift;
