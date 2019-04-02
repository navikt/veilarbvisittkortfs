import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarselSolid } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import { settDigital } from '../../../../store/oppfolging/actions';
import OppfolgingSelector from '../../../../store/oppfolging/selector';

interface DispatchProps {
    handleSubmit: (fnr: string, veilederId: string) => ((values: BegrunnelseValues) => void);
}

interface StateProps {
    isLoading: boolean;
    fnr: string;
    veilederId: string;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartDigitalOppfolging(props: StartEskaleringProps) {
    const infoTekst = (
        <AlertStripeAdvarselSolid className="blokk-xxs">
            <FormattedMessage id="innstillinger.modal.digital.infotekst" />
        </AlertStripeAdvarselSolid>
    );

    return (
        <BegrunnelseForm
            initialValues={{begrunnelse: ''}}
            handleSubmit={props.handleSubmit(props.fnr, props.veilederId)}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren nå kan få digital oppfølging"
            overskriftTekstId="innstillinger.modal.digital.overskrift"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
    fnr: PersonaliaSelectors.selectFodselsnummer(state),
    veilederId: state.tildelVeileder.paloggetVeileder.data.ident
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(fnr: string, veilederId: string) {
            return (values: BegrunnelseValues) => dispatch(settDigital(values.begrunnelse, fnr, veilederId));
        },
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StartDigitalOppfolging);