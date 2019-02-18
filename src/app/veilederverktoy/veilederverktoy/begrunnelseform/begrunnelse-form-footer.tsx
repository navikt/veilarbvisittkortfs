import React from "react";
import {FormattedMessage} from "react-intl";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";

interface StartEskaleringProsessFooterProps {
    spinner: boolean;
    tilbake: () => void;
}

function BegrunnelseFooter(props:StartEskaleringProsessFooterProps ) {
    return(
        <div className="modal-footer">
            <Hovedknapp
                htmlType="submit"
                spinner={props.spinner}
                autoDisableVedSpinner
            >
                <FormattedMessage id="innstillinger.modal.start-eskalering.knapp.bekreft" />
            </Hovedknapp>
            <Knapp onClick={props.tilbake}>
                <FormattedMessage id="innstillinger.modal.start-eskalering.knapp.avbryt" />
            </Knapp>
        </div>
    )
}

export default BegrunnelseFooter;