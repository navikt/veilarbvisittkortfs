import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';

interface OwnProps {
    navigerTilOpprettOppgave: () => void;
}

function OpprettOppgaveProsess({navigerTilOpprettOppgave }: OwnProps) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.opprett-oppgave.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilOpprettOppgave}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.opprett-oppgave.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}

export default visibleIf(OpprettOppgaveProsess);