import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import React from 'react';

function BergrunnelseOverskrift(props: { overskriftTekstId: string; infoTekst?: React.ReactNode }) {
    return (
        <div className="modal-info-tekst">
            <Innholdstittel className="modal-info-tekst__overskrift">
                <FormattedMessage id={props.overskriftTekstId} />
            </Innholdstittel>
            {props.infoTekst}
        </div>
    );
}
export default BergrunnelseOverskrift;
