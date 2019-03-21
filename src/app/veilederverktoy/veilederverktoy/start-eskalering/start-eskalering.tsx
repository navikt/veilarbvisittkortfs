import React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Dispatch } from 'redux';
import { opprettHenvendelse } from '../../../../store/dialog/actions';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import { Normaltekst } from 'nav-frontend-typografi';

interface DispatchProps {
    handleSubmit: (values: StartEskaleringValues) => void;
}

interface StateProps {
    isLoading: boolean;
}

interface StartEskaleringValues extends BegrunnelseValues {
    overskrift: string;
    tekst: string;
}

type StartEskaleringProps = StateProps & DispatchProps & InjectedIntlProps;

function StartEskalering(props: StartEskaleringProps) {
    const infoTekst = (
        <Normaltekst className="blokk-xs">
            <FormattedMessage id="innstillinger.modal.start-eskalering.beskrivelse" />
        </Normaltekst>
    );

    const initialValues = {
        begrunnelse:  props.intl.formatMessage({id: 'innstillinger.modal.start-eskalering.automatisk-tekst'}),
        overskrift:  props.intl.formatMessage({id: 'dialog.eskalering.overskrift'}),
        tekst: props.intl.formatMessage({id: 'innstillinger.modal.start-eskalering.automatisk-tekst'})
    };
    return (

        <BegrunnelseForm
            handleSubmit={props.handleSubmit}
            initialValues={initialValues}
            tekstariaLabel="Rediger teksten under slik at den passer."
            maxLength={5000}
            overskriftTekstId="innstillinger.modal.start-eskalering.overskrift"
            infoTekst={infoTekst}
            isLoading={props.isLoading}
        />

    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (values: StartEskaleringValues) => dispatch(opprettHenvendelse (
                {begrunnelse: values.tekst, overskrift: values.overskrift, egenskaper: ['ESKALERINGSVARSEL'], tekst: values.tekst})),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(injectIntl(StartEskalering));