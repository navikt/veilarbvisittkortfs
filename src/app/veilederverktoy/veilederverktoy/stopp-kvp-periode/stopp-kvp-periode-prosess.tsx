import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    skjulStoppKvpPeriode: boolean;
}

interface DispatchProps {
    navigerTilStopKvpPeriode: () => void;
}

function StoppKvpPeriodeProsess({skjulStoppKvpPeriode, navigerTilStopKvpPeriode }: StateProps & DispatchProps) {
    if (skjulStoppKvpPeriode) {
        return null;
    }
    return (
        <>
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.start-kvp.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStopKvpPeriode}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.stopp-kvp.tekst" />
                    </Normaltekst>
                </div>
            </StartProsess>
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulStoppKvpPeriode: !oppfolging.underOppfolging || !oppfolging.underKvp
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilStopKvpPeriode: () => dispatch(navigerAction('stopp_kvp_periode'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StoppKvpPeriodeProsess);