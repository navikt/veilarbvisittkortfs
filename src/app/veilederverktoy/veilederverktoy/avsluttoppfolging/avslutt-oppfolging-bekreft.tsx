import React from 'react';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelector from '../../../../store/personalia/selectors';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { Dispatch } from 'redux';
import { avsluttOppfolging } from '../../../../store/oppfolging/actions';
import { connect } from 'react-redux';
import VeilederVerktoyModal from './../veilederverktoy-modal';
import { navigerAction } from '../../../../store/navigation/actions';

interface StateProps {
    navn: string;
    isLoading: boolean;
}

interface DispatchProps {
    handleSubmit: () => void;
    tilbake: () => void;
}

type AvsluttOppfolgingBekreftelseModalProps = StateProps & DispatchProps;

function AvsluttOppfolgingBekreft ({navn, handleSubmit, isLoading, tilbake}: AvsluttOppfolgingBekreftelseModalProps) {

    return (
        <VeilederVerktoyModal tilbakeFunksjon={tilbake}>
            <div className="prosess">
                <AlertStripeInfoSolid className="blokk-s">
                    Er du sikker på att du vil avslutte oppfølgingsperioden til {navn} ?
                </AlertStripeInfoSolid>
                <div className="modal-footer">
                    <Hovedknapp htmlType="submit" className="btn--mr1" onClick={handleSubmit} spinner={isLoading}>
                        Bekreft
                    </Hovedknapp>
                    <Knapp>
                        Avbryt
                    </Knapp>
                </div>
            </div>
        </VeilederVerktoyModal>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelector.selectSammensattNavn(state),
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    handleSubmit: () => dispatch(avsluttOppfolging()),
    tilbake: () => dispatch(navigerAction('avslutt_oppfolging'))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingBekreft);