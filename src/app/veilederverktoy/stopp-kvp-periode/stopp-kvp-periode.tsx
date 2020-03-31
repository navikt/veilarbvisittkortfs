import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { FormattedMessage } from 'react-intl';
import { stoppKVP } from '../../../store/oppfolging/actions';
import { Normaltekst } from 'nav-frontend-typografi';
import OppfolgingSelector from '../../../store/oppfolging/selector';

interface DispatchProps {
    handleSubmit: (values: BegrunnelseValues) => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartKvpPeriodeProsessProps = StateProps & DispatchProps;

function StoppKvpPeriode(props: StartKvpPeriodeProsessProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            <FormattedMessage id="innstillinger.modal.stopp-kvp.infotekst" />
        </Normaltekst>
    );

    const initialValues = { begrunnelse: '' };

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse:"
            overskriftTekst="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
            maxLength={250}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: BegrunnelseValues) => dispatch(stoppKVP(values.begrunnelse))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StoppKvpPeriode);
