import {InnstillingsHistorikk} from "../../../../../types/innstillings-historikk";
import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Element, Normaltekst, Undertekst} from "nav-frontend-typografi";
import {opprettetAv} from "./opprettet-av";
import moment from "moment";

interface OwnProps {
    instillingsHistorikk: InnstillingsHistorikk
}

function InnstillingHistorikkKomponent({instillingsHistorikk}: OwnProps) {
    const {type, begrunnelse} = instillingsHistorikk;
    return (
        <div className="historikk__elem">
            <Element>
                <FormattedMessage id={`innstillinger.modal.historikk-${type.toLowerCase()}`}/>
            </Element>
            <Normaltekst>
                {begrunnelse}
            </Normaltekst>
            <Undertekst>
                {`for ${moment(instillingsHistorikk.dato).fromNow()} ${opprettetAv(instillingsHistorikk.opprettetAv, instillingsHistorikk.opprettetAvBrukerId)}`}
            </Undertekst>
        </div>
    )
}

export default InnstillingHistorikkKomponent;