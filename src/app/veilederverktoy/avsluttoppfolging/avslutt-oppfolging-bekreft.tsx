import React from 'react';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelector from '../../../store/personalia/selectors';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { navigerAction } from '../../../store/navigation/actions';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { avsluttOppfolging, resetBegrunnelse } from '../../../store/avslutningstatus/actions';

interface StateProps {
    navn: string;
    isLoading: boolean;
}

interface DispatchProps {
    handleSubmit: () => void;
    avbryt: () => void;
}

type AvsluttOppfolgingBekreftelseModalProps = StateProps & DispatchProps;

function AvsluttOppfolgingBekreft({ navn, handleSubmit, isLoading, avbryt }: AvsluttOppfolgingBekreftelseModalProps) {
    return (
        <VarselModal
            className=""
            contentLabel="Bruker kan ikke varsles"
            onRequestClose={avbryt}
            isOpen={true}
            type="ADVARSEL"
        >
            <>
                <Normaltekst>Er du sikker på at du vil avslutte oppfølgingsperioden til {navn}?</Normaltekst>
                <div className="modal-footer">
                    <Hovedknapp
                        htmlType="submit"
                        style={{ marginRight: '1rem' }}
                        onClick={handleSubmit}
                        spinner={isLoading}
                    >
                        Bekreft
                    </Hovedknapp>
                    <Knapp onClick={avbryt}>Avbryt</Knapp>
                </div>
            </>
        </VarselModal>
    );
}

const mapStateToProps = (state: Appstate): StateProps => ({
    navn: PersonaliaSelector.selectSammensattNavn(state),
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    handleSubmit: () => dispatch(avsluttOppfolging()),
    avbryt: () => {
        dispatch(navigerAction(null));
        dispatch(resetBegrunnelse());
    },
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AvsluttOppfolgingBekreft);
