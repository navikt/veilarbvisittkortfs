import { Innholdstittel, Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import React from 'react';

function BergrunnelseOverskrift (props: {overskriftTekstId: string, infoTekst?: React.ReactNode, navnPaMotpart: string }) {
    return (
        <div className="modal-info-tekst">
            <Innholdstittel className="modal-info-tekst__overskrift">
                <FormattedMessage
                    id="innstillinger.modal.overskrift"
                    values={{ navn: props.navnPaMotpart }}
                />
            </Innholdstittel>
            <Systemtittel className="modal-info-tekst__undertekst">
                <FormattedMessage id={props.overskriftTekstId}/>
            </Systemtittel>

            {props.infoTekst}
        </div>
    );
}
export default BergrunnelseOverskrift;