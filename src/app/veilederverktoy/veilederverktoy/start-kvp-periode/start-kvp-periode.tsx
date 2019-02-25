import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm from '../begrunnelseform/begrunnelse-form';
import { FormattedMessage } from 'react-intl';
import { startKVP } from '../../../../store/oppfolging/start-stopp-kvp-periode-actions';
import { Normaltekst } from 'nav-frontend-typografi';

interface DispatchProps {
    handleSubmit: (tekst: string) => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartKvpPeriodeProsessProps = StateProps & DispatchProps;

function StarKvpPeriode(props: StartKvpPeriodeProsessProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            <FormattedMessage id="innstillinger.modal.start-kvp.infotekst" />
        </Normaltekst>);

    return (
        <BegrunnelseForm
            tekst={null}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse:"
            overskriftTekstId="innstillinger.prosess.start-kvp.tittel"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: state.oppfolging.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (begrunnelse: string) => dispatch(startKVP(begrunnelse))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StarKvpPeriode);