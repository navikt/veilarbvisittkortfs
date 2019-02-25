import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    skjulStartEskalering: boolean;
}

interface DispatchProps {
    navigerTilStartEsklaringForm: () => void;
}

function StartEskaleringProsess({skjulStartEskalering, navigerTilStartEsklaringForm }: StateProps & DispatchProps) {
    if (!skjulStartEskalering) {
        return null;
    }
    return (
        <>
            <StartProsess
                className="innstillinger__prosess"
                tittelId="innstillinger.prosess.start-eskalering.tittel"
                knappetekstId="innstillinger.modal.prosess.start.knapp"
                onClick={navigerTilStartEsklaringForm}
            >
                <div className="blokk-xs">
                    <Normaltekst>
                        <FormattedMessage id="innstillinger.prosess.start-eskalering.tekst" />
                    </Normaltekst>
                </div>
            </StartProsess>
        </>
    );
}

const mapStateToProps = (state: Appstate): StateProps => {
    const oppfolging = state.oppfolging.data;
    return{
        skjulStartEskalering:
            !oppfolging.underOppfolging ||
            !oppfolging.gjeldeneEskaleringsvarsel ||
            oppfolging.reservarsjonKRR ||
            oppfolging.manuell
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilStartEsklaringForm: () => dispatch(navigerAction('start_eskalering'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(StartEskaleringProsess);