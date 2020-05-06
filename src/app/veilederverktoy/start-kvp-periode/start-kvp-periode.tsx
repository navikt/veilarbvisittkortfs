import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { startKVP } from '../../../store/oppfolging/actions';
import { Normaltekst } from 'nav-frontend-typografi';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { InjectedIntlProps } from 'react-intl';

interface DispatchProps {
    handleSubmit: (values: BegrunnelseValues) => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartKvpPeriodeProsessProps = StateProps & DispatchProps & InjectedIntlProps;

function StarKvpPeriode(props: StartKvpPeriodeProsessProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            Når du klikker «Bekreft» vil bare veiledere i din enhet ha tilgang på dialoger, aktiviteter og mål som blir
            opprettet i KVP-perioden. Du må skrive en kommentar før du bekrefter.
        </Normaltekst>
    );

    const initialValues = { begrunnelse: '' };

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse:"
            tittel="Start periode i Kvalifiseringsprogrammet (KVP)"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
            maxLength={250}
            intl={props.intl}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: BegrunnelseValues) => dispatch(startKVP(values.begrunnelse)),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StarKvpPeriode);
