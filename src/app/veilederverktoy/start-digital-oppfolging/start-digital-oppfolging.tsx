import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import { settDigital } from '../../../store/oppfolging/actions';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { VarselModal } from '../../components/varselmodal/varsel-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { navigerAction } from '../../../store/navigation/actions';

interface DispatchProps {
    handleSubmit: (fnr: string, veilederId: string) => (values: BegrunnelseValues) => void;
    lukkModal: () => void;
}

interface StateProps {
    isLoading: boolean;
    fnr: string;
    veilederId: string;
    reservasjonKRR: boolean;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartDigitalOppfolging(props: StartEskaleringProps) {
    if (props.reservasjonKRR) {
        return (
            <VarselModal
                type="ADVARSEL"
                contentLabel="Brukeren er reservert i KRR"
                isOpen={true}
                onRequestClose={props.lukkModal}
            >
                <Normaltekst>
                    <FormattedMessage id="instillinger.proses.manuell.reservasjon-krr" />
                </Normaltekst>
            </VarselModal>
        );
    }

    const infoTekst = (
        <AlertStripeAdvarsel className="blokk-xxs">
            Når du endrer til digital oppfølging, kan du ha dialog med brukeren i aktivitetsplanen.
        </AlertStripeAdvarsel>
    );

    return (
        <BegrunnelseForm
            initialValues={{ begrunnelse: '' }}
            handleSubmit={props.handleSubmit(props.fnr, props.veilederId)}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            overskriftTekst="Endre til digital oppfølging"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    veilederId: state.tildelVeileder.paloggetVeileder.data.ident,
    reservasjonKRR: state.oppfolging.data.reservasjonKRR
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(fnr: string, veilederId: string) {
            return (values: BegrunnelseValues) => dispatch(settDigital(values.begrunnelse, fnr, veilederId));
        },
        lukkModal: () => dispatch(navigerAction(null))
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StartDigitalOppfolging);
