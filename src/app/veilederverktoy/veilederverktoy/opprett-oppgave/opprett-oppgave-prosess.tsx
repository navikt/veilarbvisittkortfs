import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import StartProsess from './../prosess/start-prosess';
import { Appstate } from '../../../../types/appstate';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { navigerAction } from '../../../../store/navigation/actions';
import OppfolgingSelector from "../../../../store/oppfolging/selector";

interface StateProps {
    skjulOpprettOppgave: boolean;
}

interface DispatchProps {
    navigerTilOpprettOppgave: () => void;
}

function OpprettOppgaveProsess({skjulOpprettOppgave, navigerTilOpprettOppgave }: StateProps & DispatchProps) {
    if (skjulOpprettOppgave) {
        return null;
    }
    return (
        <StartProsess
            className="innstillinger__prosess"
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

const mapStateToProps = (state: Appstate): StateProps => ({
    skjulOpprettOppgave: OppfolgingSelector.selectKanOppretteOppgave(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    navigerTilOpprettOppgave: () => dispatch(navigerAction('opprett_oppgave'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(OpprettOppgaveProsess);