import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { stoppKVP } from '../../../store/oppfolging/actions';
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

function StoppKvpPeriode(props: StartKvpPeriodeProsessProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            KVP-perioden til brukeren er avsluttet. Veiledere i andre enheter har nå tilgang til dialoger, aktiviteter
            og mål som er opprettet før og etter KVP-perioden.
        </Normaltekst>
    );

    const initialValues = { begrunnelse: '' };

    return (
        <BegrunnelseForm
            initialValues={initialValues}
            handleSubmit={props.handleSubmit}
            tekstariaLabel="Begrunnelse:"
            tittel="Avslutt periode i Kvalifiseringsprogrammet (KVP)"
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
    handleSubmit: (values: BegrunnelseValues) => dispatch(stoppKVP(values.begrunnelse)),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StoppKvpPeriode);
