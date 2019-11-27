import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';

interface StartEskaleringProsessProps {
    navigerTilStartEsklaring: () => void;
    kanIkkeVarsles: boolean;
}

function StartEskaleringProsess({ navigerTilStartEsklaring, kanIkkeVarsles }: StartEskaleringProsessProps) {
    if (kanIkkeVarsles) {
        return (
            <article className="prosess gra-border">
                <Undertittel className="prosess_overskrift">
                    <FormattedMessage id="innstillinger.prosess.start-eskalering.tittel" />
                </Undertittel>
                <AlertStripe type="advarsel" className={'blokk-xs'}>
                    Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende
                    varsel.
                </AlertStripe>
            </article>
        );
    }

    return (
        <StartProsess
            tittelId="innstillinger.prosess.start-eskalering.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilStartEsklaring}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.start-eskalering.tekst" />
                </Normaltekst>
            </div>
        </StartProsess>
    );
}

const mapStateToProps = (state: Appstate) => ({
    kanIkkeVarsles: !state.oppfolging.data.kanVarsles
});

export default connect(mapStateToProps)(visibleIf(StartEskaleringProsess));
