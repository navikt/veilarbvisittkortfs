import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    skjulStartManuellOppfolging: boolean;
}

interface DispatchProps {
    navigerTilStartManuellOppfolging: () => void;
}

function StarManuellOppfolging({skjulStartManuellOppfolging, navigerTilStartManuellOppfolging }: StateProps & DispatchProps) {
    if (skjulStartManuellOppfolging) {
        return null;
    }
    return (
        <>
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.manuell.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStartManuellOppfolging}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.manuell.tekst" />
                    </Normaltekst>
                </div>
            </StartProsess>
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return {
        skjulStartManuellOppfolging: !oppfolging.underOppfolging || oppfolging.manuell
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilStartManuellOppfolging: () => dispatch(navigerAction('manuell_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StarManuellOppfolging);