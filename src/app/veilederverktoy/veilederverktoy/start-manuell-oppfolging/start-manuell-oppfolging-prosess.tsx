import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm from '../begrunnelseform/begrunnelse-form';
import { AlertStripeInfoSolid } from 'nav-frontend-alertstriper';
import { FormattedMessage } from 'react-intl';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import { settManuell } from '../../../../store/oppfolging/sett-manuell-digitial-actions';

interface DispatchProps {
    handleSubmit: (fnr: string, veilederId: string) => ((tekst: string) => void);
}

interface StateProps {
    isLoading: boolean;
    fnr: string;
    veilederId: string;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartManuellOppfolgingProsess(props: StartEskaleringProps) {
    const infoTekst = (
        <AlertStripeInfoSolid className="blokk-xxs">
            <FormattedMessage id="innstillinger.modal.manuell.infotekst" />
        </AlertStripeInfoSolid>
    );

    return (
        <BegrunnelseForm
            tekst={null}
            handleSubmit={props.handleSubmit(props.fnr, props.veilederId)}
            tekstariaLabel="Skriv en begrunnelse for hvorfor brukeren trenger manuell oppfølging"
            overskriftTekstId="innstillinger.modal.manuell.overskrift"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: state.oppfolging.isLoading,
    fnr: PersonaliaSelectors.selectFodselsnummer(state), //TODO LAGE MIDDLEWEAR SOM HENTER UT FNR???
    veilederId: state.tildelVeileder.paloggetVeileder.data.ident
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(fnr: string, veilederId: string) {
            return (tekst: string) => dispatch(settManuell( tekst, fnr, veilederId));
        },
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StartManuellOppfolgingProsess);