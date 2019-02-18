import {Systemtittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import React from "react";

function StartEskaleringOverskrift (props: any) {
    return (
        <FormattedMessage id="dialog.eskalering.overskrift">
            {overskrift =>
                <FormattedMessage id="innstillinger.modal.start-eskalering.automatisk-tekst">
                    {defaultTekst => {
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
                    }}
                </FormattedMessage>
            }
        </FormattedMessage>
    )
}
export default StartEskaleringOverskrift;