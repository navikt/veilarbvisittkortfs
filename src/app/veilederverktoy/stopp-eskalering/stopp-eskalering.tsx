import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Appstate } from '../../../types/appstate';
import PersonaliaSelectors from '../../../store/personalia/selectors';
import { stoppEskalering } from '../../../store/oppfolging/actions';
import OppfolgingSelector from '../../../store/oppfolging/selector';
import FormikModal from '../../components/formik/formik-modal';
import { Normaltekst } from 'nav-frontend-typografi';
import { Form } from 'formik';
import FormikCheckBox from '../../components/formik/formik-checkbox';
import BegrunnelseFooter from '../begrunnelseform/begrunnelse-form-footer';
import { BegrunnelseTextArea } from '../begrunnelseform/begrunnelse-textarea';
import './stopp-eskalering.less';
interface DispatchProps {
    handleSubmit: (dialogId: string, skalSendeHendelse: boolean, beskrivelse?: string) => void;
}

interface StateProps {
    navn: string;
    isLoading: boolean;
    tilhorendeDialogId: string;
}

type StoppEskaleringProps = StateProps & DispatchProps;

function StoppEskalering(props: StoppEskaleringProps) {
    return (
        <FormikModal
            tittel="Fjern markering av varsel"
            className="stopp-eskalering"
            initialValues={{
                begrunnelse: 'Du har gjennomført møtet eller aktiviteten som vi ba deg om å gjøre.',
                skalSendeHendelse: false,
            }}
            handleSubmit={(values) =>
                props.handleSubmit(props.tilhorendeDialogId, values.skalSendeHendelse, values.begrunnelse)
            }
            contentLabel="Stopp begrunnelse"
            visConfirmDialog={false}
            render={(formikProps) => {
                return (
                    <div className="modal-innhold">
                        <Form>
                            <FormikCheckBox name="skalSendeHendelse" label={'Send bruker en henvendelse'} />
                            {formikProps.values.skalSendeHendelse && (
                                <>
                                    <Normaltekst className="stopp-eskalering__tekst">
                                        Legg inn eller rediger tekst som du sender til brukeren.
                                    </Normaltekst>
                                    <BegrunnelseTextArea
                                        tekstariaLabel="Se eksempel på tekst til brukeren under:"
                                        maxLength={500}
                                    />
                                </>
                            )}
                            <BegrunnelseFooter spinner={props.isLoading} />
                        </Form>
                    </div>
                );
            }}
        />
    );
}

const mapStateToProps = (state: Appstate) => {
    const gjeldendeEskaleringsVarsel = OppfolgingSelector.selectGjeldeneEskaleringsVarsel(state);
    return {
        isLoading: OppfolgingSelector.selectOppfolgingStatus(state),
        navn: PersonaliaSelectors.selectSammensattNavn(state),
        tilhorendeDialogId: gjeldendeEskaleringsVarsel ? gjeldendeEskaleringsVarsel.tilhorendeDialogId : '',
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    handleSubmit: (dialogId: string, skalSendeHendelse: boolean, beskrivelse?: string) =>
        dispatch(stoppEskalering(dialogId, skalSendeHendelse, beskrivelse)),
});

export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(StoppEskalering);
