import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    skjulStartKvpPeriode: boolean;
}

interface DispatchProps {
    navigerTilStartKvpPeriode: () => void;
}

function StartKvpPeriodeProsess({skjulStartKvpPeriode, navigerTilStartKvpPeriode }: StateProps & DispatchProps) {
    if (skjulStartKvpPeriode) {
        return null;
    }
    return (
        <>
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.start-kvp.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStartKvpPeriode}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.start-kvp.tekst" />
                    </Normaltekst>
                </div>
            </StartProsess>
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulStartKvpPeriode: !oppfolging.underOppfolging || oppfolging.underKvp
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilStartKvpPeriode: () => dispatch(navigerAction('start_kvp_periode'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StartKvpPeriodeProsess);