import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import visibleIf from '../../../components/visible-if';
import AlertStripe from 'nav-frontend-alertstriper';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import FeatureApi from '../../../../api/feature-api';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface StartEskaleringProsessProps {
    navigerTilStartEsklaring: () => void;
    kanIkkeVarsles: boolean;
}

function StartEskaleringProsess({navigerTilStartEsklaring, kanIkkeVarsles }: StartEskaleringProsessProps) {
    const[ kanVarslesFeature, setKanVarslesFeature] = useState(false);
    const[ laster, setLaster] = useState(true);

    useEffect(() => {
        FeatureApi.hentFeatures('veilarbvisittkortfs.kanVarsles')
            .then(resp => {
                setKanVarslesFeature(resp['veilarbvisittkortfs.kanVarsles']);
                setLaster(false);
            });
    }, [kanVarslesFeature]);

    if (laster) {
        return <NavFrontendSpinner type="L"/>;
    }

    if (kanIkkeVarsles && kanVarslesFeature) {
        return (
            <article className="prosess gra-border">
                <Undertittel className="prosess_overskrift">
                    <FormattedMessage id="innstillinger.prosess.start-eskalering.tittel"/>
                </Undertittel>
                <AlertStripe type="advarsel" className={'blokk-xs'}>
                    Brukeren har ikke bekreftet telefonnummer og e-postadresse i Kontakt- og reservasjonsregisteret de siste 18 månedene, og du kan derfor ikke sende varsel.
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

export default connect(mapStateToProps) (visibleIf(StartEskaleringProsess));