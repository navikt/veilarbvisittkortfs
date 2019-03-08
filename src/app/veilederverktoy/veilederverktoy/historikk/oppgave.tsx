import * as React from "react";
import {FormattedMessage} from "react-intl";
import {Element, Normaltekst, Undertekst} from "nav-frontend-typografi";
import {OppgaveHistorikk} from "../../../../types/oppgave-historikk";

interface OwnProps {
    oppgaveHistorikk: OppgaveHistorikk
}

function OppgaveHistorikkKomponent({oppgaveHistorikk}: OwnProps) {
    const {oppgaveTema, oppgaveType} = oppgaveHistorikk;
    return (
        <div>
            <Element>
                <FormattedMessage id="innstillinger.modal.historikk-gosys-oppgave"/>
            </Element>
            <Normaltekst>
                <FormattedMessage
                    id="innstillinger.modal.historikk-gosys-oppgave-tekst"
                    values={{oppgaveTema,oppgaveType}}
                />
            </Normaltekst>
            <Undertekst>Undertekst</Undertekst>
        </div>
    )
}

export default OppgaveHistorikkKomponent;