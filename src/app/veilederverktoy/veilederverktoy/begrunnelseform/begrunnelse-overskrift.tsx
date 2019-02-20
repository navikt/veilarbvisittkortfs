import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import React from 'react';

function BergrunnelseOverskrift (props: {overskriftTekstId: string, infoTekst: React.ReactNode }) {
    return (
        <>
            <Systemtittel>
                <FormattedMessage id={props.overskriftTekstId}/>
            </Systemtittel>

            {props.infoTekst}

        </>

    );
}
export default BergrunnelseOverskrift;