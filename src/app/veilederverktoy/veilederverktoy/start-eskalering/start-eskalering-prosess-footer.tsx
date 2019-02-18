import React from "react";
import {FormattedMessage} from "react-intl";
import {Hovedknapp, Knapp} from "nav-frontend-knapper";

function StartEskaleringFooter(props:{spinner:boolean}) {
    return(
        <div className="modal-footer">
            <Hovedknapp
                htmlType="submit"
                spinner={props.spinner}
                autoDisableVedSpinner
            >
                <FormattedMessage id="innstillinger.modal.start-eskalering.knapp.bekreft" />
            </Hovedknapp>
            <Knapp onClick={()=> console.log("hello")}>
                <FormattedMessage id="innstillinger.modal.start-eskalering.knapp.avbryt" />
            </Knapp>
        </div>
    )
}

export default StartEskaleringFooter;