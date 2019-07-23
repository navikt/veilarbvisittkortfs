import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import { settManuell } from '../../../../store/oppfolging/actions';
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

function StartManuellOppfolging(props: StartEskaleringProps) {
    const infoTekst = (
        <AlertStripeAdvarsel className="blokk-xxs">
            <FormattedMessage id="innstillinger.modal.manuell.infotekst" />
        </AlertStripeAdvarsel>
    );

    return (
        <BegrunnelseForm
            initialValues={{begrunnelse: ''}}
            handleSubmit={props.handleSubmit(props.fnr, props.veilederId)}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren trenger manuell oppfølging"
            overskriftTekstId="innstillinger.modal.manuell.overskrift"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state) ,
    fnr: PersonaliaSelectors.selectFodselsnummer(state), //TODO LAGE MIDDLEWEAR SOM HENTER UT FNR???
    veilederId: state.tildelVeileder.paloggetVeileder.data.ident
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(fnr: string, veilederId: string) {
            return (values: BegrunnelseValues) => dispatch(settManuell( values.begrunnelse, fnr, veilederId));
        },
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StartManuellOppfolging);