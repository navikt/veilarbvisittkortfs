import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { opprettHenvendelse } from '../../../../store/dialog/actions';
import { connect } from 'react-redux';
import { navigerAction } from '../../../../store/navigation/actions';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm from '../begrunnelseform/begrunnelse-form';
import OppfolgingSelector from "../../../../store/oppfolging/selector";
import DialogSelector from "../../../../store/dialog/selector";

interface DispatchProps {
    handleSubmit: (overskrift: string) => ((tekst: string) => void);
    tilbake: () => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartEskalering(props: StartEskaleringProps) {
    const infoTekst = (
        <div className="blokk-xxs">
            <FormattedMessage id="innstillinger.modal.start-eskalering.beskrivelse" />
        </div>
    );
    return (
        <FormattedMessage id="dialog.eskalering.overskrift">
            {overskrift =>
                <FormattedMessage id="innstillinger.modal.start-eskalering.automatisk-tekst">
                    {defaultTekst =>
                        <BegrunnelseForm
                            tekst={defaultTekst as string}
                            handleSubmit={props.handleSubmit(overskrift as string)}
                            tekstariaLabel="Rediger teksten under slik at den passer."
                            maxLength={5000}
                            overskriftTekstId="innstillinger.modal.start-eskalering.overskrift"
                            infoTekst={infoTekst}
                            isLoading={props.isLoading}
                        />
                    }
                </FormattedMessage>
            }
        </FormattedMessage>
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state) || DialogSelector.selectDialogStatus(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(overskrift: string) {
            return (tekst: string) => dispatch(opprettHenvendelse(
                    {begrunnelse: tekst, overskrift, egenskaper: ['ESKALERINGSVARSEL'], tekst}));
        },
        tilbake: () => dispatch(navigerAction(null))
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(injectIntl(StartEskalering));