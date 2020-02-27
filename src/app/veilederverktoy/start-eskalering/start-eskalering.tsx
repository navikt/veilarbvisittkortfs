import React from 'react';
import { FormattedMessage, injectIntl, InjectedIntlProps } from 'react-intl';
import { Dispatch } from 'redux';
import { opprettHenvendelse } from '../../../store/dialog/actions';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import BegrunnelseForm, { BegrunnelseValues } from '../begrunnelseform/begrunnelse-form';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import { Normaltekst } from 'nav-frontend-typografi';
import { navigerAction } from '../../../store/navigation/actions';
import { VarselModal } from '../../components/varselmodal/varsel-modal';

interface DispatchProps {
    handleSubmit: (values: StartEskaleringValues) => void;
    lukkModal: () => void;
}

interface StateProps {
    isLoading: boolean;
    kanIkkeVarsles: boolean;
}

interface StartEskaleringValues extends BegrunnelseValues {
    overskrift: string;
    tekst: string;
}

type StartEskaleringProps = StateProps & DispatchProps & InjectedIntlProps;

function StartEskalering(props: StartEskaleringProps) {
    if (props.kanIkkeVarsles) {
        return (
            <VarselModal
                className=""
                contentLabel="Bruker kan ikke varsles"
                onRequestClose={props.lukkModal}
                isOpen={true}
                type="ADVARSEL"
            >
                Brukeren er ikke registrert i Kontakt- og reservasjonsregisteret, og du kan derfor ikke sende varsel.
            </VarselModal>
        );
    }

    const infoTekst = (
        <Normaltekst className="blokk-xs">
            <FormattedMessage id="innstillinger.modal.start-eskalering.beskrivelse" />
        </Normaltekst>
    );

    const initialValues = {
        begrunnelse: props.intl.formatMessage({ id: 'innstillinger.modal.start-eskalering.automatisk-tekst' }),
        overskrift: props.intl.formatMessage({ id: 'dialog.eskalering.overskrift' }),
        tekst: props.intl.formatMessage({ id: 'innstillinger.modal.start-eskalering.automatisk-tekst' })
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
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state) || state.dialoger.status === 'LOADING',
    kanIkkeVarsles: !state.oppfolging.data.kanVarsles
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    lukkModal: () => dispatch(navigerAction(null)),
    handleSubmit: (values: StartEskaleringValues) =>
        dispatch(
            opprettHenvendelse({
                begrunnelse: values.begrunnelse,
                overskrift: values.overskrift,
                egenskaper: ['ESKALERINGSVARSEL'],
                tekst: values.begrunnelse
            })
        )
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(injectIntl(StartEskalering));
