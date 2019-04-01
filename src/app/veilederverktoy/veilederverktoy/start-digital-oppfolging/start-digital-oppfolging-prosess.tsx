import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { HiddenIfAlertStripeInfoSolid } from '../../../components/hidden-if/hidden-if-alertstripe';
import visibleIf from '../../../components/visible-if';
import OppfolgingSelector from '../../../../store/oppfolging/selector';

interface StateProps {
    reservasjonKRR: boolean;
}

interface OwnProps {
    navigerTilStartDigitalOppfolging: () => void;
}

type StartDigitalOppfolgingProsess = StateProps & OwnProps;

function StartDigitalOppfolgingProsess({navigerTilStartDigitalOppfolging, reservasjonKRR}: StartDigitalOppfolgingProsess) {
    return (
        <StartProsess
            tittelId="innstillinger.prosess.digital.tittel"
            knappetekstId="innstillinger.modal.prosess.start.knapp"
            onClick={navigerTilStartDigitalOppfolging}
            hiddenKnapp={reservasjonKRR}
        >
            <div className="blokk-xs">
                <Normaltekst>
                    <FormattedMessage id="innstillinger.prosess.digital.tekst" />
                </Normaltekst>
                <HiddenIfAlertStripeInfoSolid hidden={!reservasjonKRR}>
                    <FormattedMessage id="instillinger.proses.manuell.reservasjon-krr" />
                </HiddenIfAlertStripeInfoSolid>
            </div>
        </StartProsess>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    reservasjonKRR: OppfolgingSelector.selectErKRR(state)
});

export default connect<StateProps, {}, OwnProps>(mapStateToProps)(visibleIf(StartDigitalOppfolgingProsess));