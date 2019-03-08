import {InnstillingsHistorikk} from "../../../../types/innstillings-historikk";
import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Element, Normaltekst, Undertekst} from "nav-frontend-typografi";

interface OwnProps {
    instillingsHistorikk: InnstillingsHistorikk
}

function InnstillingHistorikkKomponent({instillingsHistorikk}: OwnProps) {
    const {type, begrunnelse} = instillingsHistorikk;
    return (
        <div>
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-${type.toLowerCase()}`}/>
            </Element>
            <Normaltekst>
                {begrunnelse}
            </Normaltekst>
            <Undertekst>Undertekst</Undertekst>
        </div>
    )
}

export default InnstillingHistorikkKomponent;