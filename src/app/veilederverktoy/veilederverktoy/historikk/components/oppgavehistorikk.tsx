import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Element, Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { OppgaveHistorikk } from '../../../../../types/oppgave-historikk';
import { opprettetAvTekst } from './opprettet-av';
import moment from 'moment';

interface OwnProps {
    oppgaveHistorikk: OppgaveHistorikk;
}

function OppgaveHistorikkKomponent({oppgaveHistorikk}: OwnProps) {
    const {oppgaveTema, oppgaveType} = oppgaveHistorikk;
    return (
        <div className="historikk__elem blokk-xs">
            <Element>
                <FormattedMessage id="innstillinger.modal.historikk-gosys-oppgave"/>
            </Element>
            <Normaltekst>
                <FormattedMessage
                    id="innstillinger.modal.historikk-gosys-oppgave-tekst"
                    values={{oppgaveTema, oppgaveType}}
                />
            </Normaltekst>
            <Undertekst>
                {`${moment(oppgaveHistorikk.dato).format('DD.MM.YYYY')} ${opprettetAvTekst(oppgaveHistorikk.opprettetAv, oppgaveHistorikk.opprettetAvBrukerId)}`}
            </Undertekst>
        </div>
    );
}

export default OppgaveHistorikkKomponent;