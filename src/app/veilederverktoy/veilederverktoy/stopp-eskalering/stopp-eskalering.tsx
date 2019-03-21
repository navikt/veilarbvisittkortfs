import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../../types/appstate';
import PersonaliaSelectors from '../../../../store/personalia/selectors';
import { stoppEskalering } from '../../../../store/oppfolging/actions';
import OppfolgingSelector from '../../../../store/oppfolging/selector';
import FormikModal from '../../../components/formik/formik-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import FormikCheckBox from '../../../components/formik/formik-checkbox';
import { InjectedIntlProps, injectIntl }  from 'react-intl';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import BergrunnelseOverskrift from '../begrunnelseform/begrunnelse-overskrift';

interface DispatchProps {
    handleSubmit: (beskrivelse?: string) => void;
}

interface StateProps {
    navn: string;
    isLoading: boolean;
}

type StoppEskaleringProps = StateProps & DispatchProps & InjectedIntlProps;

function StoppEskalering(props: StoppEskaleringProps) {
    return(
        <FormikModal
            initialValues={{
                begrunnelse : props.intl.formatMessage({id: 'innstillinger.modal.stopp-eskalering.automatisk-tekst'}),
                skallSendeHenvdelse: false
            }}
            handleSubmit={(values) => props.handleSubmit(values.begrunnelse)}
            contentLabel="Stopp begrunnelse"
            visConfirmDialog={false}
            render={(formikProps) => {
                return (
                    <div className="modal-innhold">
                        <BergrunnelseOverskrift
                            overskriftTekstId="innstillinger.modal.stopp-eskalering.overskrift"
                            navnPaMotpart={props.navn}
                        />
                        <Form>
                            <FormikCheckBox
                                name="skallSendeHenvdelse"
                                label={
                                    <FormattedMessage id="innstillinger.modal.stop-eskalering.henvendelse.checkbox.tittel" />
                                }
                            />
                            {formikProps.values.skallSendeHenvdelse &&
                            <>
                                <Normaltekst>
                                    <FormattedMessage id="innstillinger.modal.stopp-eskalering.beskrivelse" />
                                </Normaltekst>
                                <BegrunnelseTextArea
                                    tekstariaLabel="innstillinger.modal.stopp-eskalering.begrunnelse"
                                    maxLength={500}
                                />
                            </>
                            }
                            <BegrunnelseFooter spinner={props.isLoading}/>
                        </Form>
                    </div>
                );
            }}
        />
    );
}

const mapStateToProps = (state: Appstate) => ({
    isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
    navn: PersonaliaSelectors.selectSammensattNavn(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (beskrivelse?: string) => dispatch(stoppEskalering(beskrivelse))
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(injectIntl(StoppEskalering));