import {Systemtittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import React from "react";

function StartEskaleringOverskrift () {
    return (
        <>
            <Systemtittel>
                <FormattedMessage id="innstillinger.modal.start-eskalering.overskrift"/>
            </Systemtittel>

            <div className="blokk-xxs">
                <FormattedMessage id="innstillinger.modal.start-eskalering.beskrivelse" />
            </div>

        </>

    )
}
export default StartEskaleringOverskrift;