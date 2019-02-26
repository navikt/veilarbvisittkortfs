import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import {HiddenIfAlertStripeInfoSolid} from "../../../components/hidden-if/hidden-if-alertstripe";

interface StateProps {
    skjulStartDigitalOppfolging: boolean;
    reservasjonKRR: boolean;
}

interface DispatchProps {
    navigerTilStartDigitalOppfolgingForm: () => void;
}

function StartDigitalOppfolgingProsess({skjulStartDigitalOppfolging, navigerTilStartDigitalOppfolgingForm, reservasjonKRR }: StateProps & DispatchProps) {
    if (skjulStartDigitalOppfolging) {
        return null;
    }
    return (
        <>
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.digital.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStartDigitalOppfolgingForm}
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
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulStartDigitalOppfolging: !oppfolging.underOppfolging || !oppfolging.manuell,
        reservasjonKRR: oppfolging.reservarsjonKRR
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilStartDigitalOppfolgingForm: () => dispatch(navigerAction('start_digital_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StartDigitalOppfolgingProsess);