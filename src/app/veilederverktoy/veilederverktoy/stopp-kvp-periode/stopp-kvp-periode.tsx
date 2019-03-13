import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm from '../begrunnelseform/begrunnelse-form';
import { FormattedMessage } from 'react-intl';
import { stoppKVP } from '../../../../store/oppfolging/actions';
import { Normaltekst } from 'nav-frontend-typografi';
import OppfolgingSelector from '../../../../store/oppfolging/selector';

interface DispatchProps {
    handleSubmit: (tekst: string) => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartKvpPeriodeProsessProps = StateProps & DispatchProps;

function StoppKvpPeriode(props: StartKvpPeriodeProsessProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            <FormattedMessage id="innstillinger.modal.stopp-kvp.infotekst" />
        </Normaltekst>);

    return (
        <BegrunnelseForm
            tekst={null}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse:"
            overskriftTekstId="innstillinger.prosess.stopp-kvp.tittel"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (begrunnelse: string) => dispatch(stoppKVP(begrunnelse))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StoppKvpPeriode);