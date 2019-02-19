import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dispatch } from 'redux';
import { opprettHenvendelse } from '../../../../store/dialog/actions';
import { connect } from 'react-redux';
import { navigerTilbake } from '../../../../store/navigation/actions';
import { Appstate } from '../../../../types/appstate';
import BegrunnelseForm from '../begrunnelseform/begrunnelse-form';

interface DispatchProps {
    handleSubmit: (overskrift: string) => ((tekst: string) => void);
    tilbake: () => void;
}

interface StateProps {
    isLoading: boolean;
}

type StartEskaleringProps = StateProps & DispatchProps;

function StartEskalering(props: StartEskaleringProps) {
    return (
        <FormattedMessage id="dialog.eskalering.overskrift">
            {overskrift =>
                <FormattedMessage id="innstillinger.modal.start-eskalering.automatisk-tekst">
                    {defaultTekst =>
                        <BegrunnelseForm
                            tekst={defaultTekst as string}
                            handleSubmit={props.handleSubmit(overskrift as string)}
                            tekstariaLabel="herpsderps"
                            maxLength={500}
                            overskriftTekstId="innstillinger.modal.start-eskalering.overskrift"
                            beskrivelseTekstId="innstillinger.modal.start-eskalering.beskrivelse"
                            isLoading={props.isLoading}
                        />
                    }
                </FormattedMessage>
            }
        </FormattedMessage>
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: state.dialog.isLoading || state.oppfolging.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleSubmit(overskrift: string) {
            return (tekst: string) => dispatch(opprettHenvendelse(
                    {begrunnelse: tekst, overskrift, egenskaper: ['ESKALERINGSVARSEL'], tekst}));
        },
        tilbake: () => dispatch(navigerTilbake())
    };
};

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(injectIntl(StartEskalering));