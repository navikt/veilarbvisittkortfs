import { Systemtittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import React from 'react';

function BergrunnelseOverskrift (props: {overskriftTekstId: string, beskrivelseTekstId: string }) {
    return (
        <>
            <Systemtittel>
                <FormattedMessage id={props.overskriftTekstId}/>
            </Systemtittel>

            <div className="blokk-xxs">
                <FormattedMessage id={props.beskrivelseTekstId} />
            </div>

        </>

    );
}
export default BergrunnelseOverskrift;