import React from 'react';
import {Formik, FormikProps} from "formik";
import NavFrontendModal from "nav-frontend-modal";
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import OpprettOppgaveForm from "./components/opprett-oppgave-form";
import {Appstate} from "../../../../types/appstate";
import PersonaliaSelector from "../../../../store/personalia/selectors";
import {connect} from "react-redux";
import {OppgaveTema, OppgaveType, PrioritetType} from "../../../../types/oppgave";
import {StringOrNothing} from "../../../../types/utils/stringornothings";
import {OrNothing} from "../../../../types/utils/ornothing";
import moment from 'moment';

interface OpprettOppgaveFormValues {
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: StringOrNothing;
    tilDato: StringOrNothing;
    prioritet: OrNothing<PrioritetType>;
    tema: OrNothing<OppgaveTema>;
    type: OrNothing<OppgaveType>;
}

interface StateProps {
    navn: string;
    fnr: string
}

/*
interface DispatchProps {
    handleSubmit: (formData: OpprettOppgaveFormValues) => void;
}
*/

function OpprettOppgave({navn, fnr}:StateProps) {

    const opprettOppgaveInitialValues: OpprettOppgaveFormValues = {
        beskrivelse: '',
        enhetId: '',
        fnr,
        fraDato: moment().format('YYYY-MM-DD'),
        tilDato:moment().format('YYYY-MM-DD'),
        prioritet: 'NORM',
        tema: null,
        type: 'VURDER_HENVENDELSE',
    };

    return (
        <Formik
            initialValues={opprettOppgaveInitialValues}
            onSubmit={(values, actions)=> {
                actions.resetForm();
            }}
            render ={ (formikProps: FormikProps<any>) =>
                <NavFrontendModal
                    className="arbeidsliste-modal"
                    contentLabel="arbeidsliste"
                    isOpen={true}
                    onRequestClose={()=> console.log('')}
                    closeButton
                >
                    <div className="modal-header-wrapper">
                        <header className="modal-header"/>
                    </div>
                    <div className="arbeidsliste__modal">
                        <div className="arbeidsliste-info-tekst">
                            <Innholdstittel className="arbeidsliste__overskrift">
                                <FormattedMessage id="arbeidsliste.modal.legg.til.overskrift" />
                            </Innholdstittel>
                            <Undertittel>
                                <FormattedMessage
                                    id="arbeidsliste.modal.personalia"
                                    values={{ navn, fnr }}
                                />
                            </Undertittel>
                            <OpprettOppgaveForm formikProps={formikProps}/>
                        </div>
                    </div>
                </NavFrontendModal>
            }
        />
    )
}

const mapStateToProps = (state: Appstate) => ({
    fnr: PersonaliaSelector.selectFodselsnummer(state),
    navn: PersonaliaSelector.selectSammensattNavn(state),

});

/*
const mapDispatchToProps = (dispatch: Dispatch)=> ({
    handleSubmit: () => dispatch()
});
*/

export default connect<StateProps>(mapStateToProps)(OpprettOppgave);