import React from 'react';
import {Form, Formik, FormikProps} from "formik";
import NavFrontendModal from "nav-frontend-modal";
import {Innholdstittel, Undertittel} from "nav-frontend-typografi";
import {FormattedMessage} from "react-intl";
import {Appstate} from "../../../../types/appstate";
import PersonaliaSelector from "../../../../store/personalia/selectors";
import {connect} from "react-redux";
import {OppgaveFormData, OppgaveTema, OppgaveType, PrioritetType} from "../../../../types/oppgave";
import moment from 'moment';
import {
    validerOppgaveDatoer
} from "../../../utils/formik-validation";
import {StringOrNothing} from "../../../../types/utils/stringornothings";
import OpprettOppgaveTemaSelector from "./components/opprett-oppgave-tema-selector";
import OppgaveInnerForm from "./components/oppgave-inner-form";
import './opprett-oppgave.less'
import {Dispatch} from "redux";
import {lagreOppgave} from "../../../../store/oppgave/actions";
import {navigerAction} from "../../../../store/navigation/actions";
import ModalHeader from "../../../components/modal/modal-header";
import {OrNothing} from "../../../../types/utils/ornothing";

export interface OpprettOppgaveFormValues {
    beskrivelse: string;
    enhetId: string;
    fnr: string;
    fraDato: string;
    tilDato: string;
    prioritet: PrioritetType;
    tema: OrNothing<OppgaveTema>;
    type: OppgaveType;
    avsenderenhetId: string;
    veilederId: StringOrNothing;
}

interface StateProps {
    navn: string;
    fnr: string;
    avsenderenhetId: StringOrNothing;
}


interface DispatchProps {
    handleSubmit: (formData: OppgaveFormData) => void;
    lukkModal: () => void;
    tilbakeTilProcesser: () => void;
}


type OpprettOppgaveProps = StateProps & DispatchProps;

function OpprettOppgave({navn, fnr, avsenderenhetId, handleSubmit, lukkModal, tilbakeTilProcesser}: OpprettOppgaveProps) {

    const opprettOppgaveInitialValues: OpprettOppgaveFormValues = {
        beskrivelse: '',
        enhetId: '',
        fnr,
        fraDato: moment().format('YYYY-MM-DD').toString(),
        tilDato:moment().format('YYYY-MM-DD').toString(),
        prioritet: 'NORM',
        tema: null ,
        type: 'VURDER_HENVENDELSE',
        veilederId: null,
        avsenderenhetId: avsenderenhetId || '',
    };

    const onRequestClose = (formikProps: FormikProps<OpprettOppgaveFormValues>) => {
        const dialogTekst = 'Alle endringer blir borte hvis du ikke lagrer. Er du sikker på at du vil lukke siden?';
        if (formikProps.dirty || confirm(dialogTekst)) {
            lukkModal();
            formikProps.resetForm();
        }
    };

    return (
        <Formik
            initialValues={opprettOppgaveInitialValues}
            validate={(values) => validerOppgaveDatoer(values.fraDato, values.tilDato)}
            onSubmit={(values)=> handleSubmit(values as OppgaveFormData)}
            render ={ (formikProps: FormikProps<OpprettOppgaveFormValues>) =>{
                return (
                <NavFrontendModal
                    className="modal"
                    contentLabel="Opprett gosys oppgave"
                    isOpen={true}
                    onRequestClose={()=> onRequestClose(formikProps)}
                    portalClassName="visittkortfs"
                    closeButton={true}
                >
                   <ModalHeader
                       tilbake={tilbakeTilProcesser}
                       tilbakeTekstId="innstillinger.modal.tilbake"
                   />
                    <div className="prosess">
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
                            <Form>
                                <OpprettOppgaveTemaSelector/>
                                <OppgaveInnerForm
                                    tema={formikProps.values.tema}
                                    fnr={fnr}
                                    enhetId={formikProps.values.enhetId}
                                    veilederId={formikProps.values.veilederId}
                                    avsenderenhetId={avsenderenhetId}
                                />
                            </Form>
                        </div>
                    </div>
                </NavFrontendModal>)
            }}
        />
    )
}

const mapStateToProps = (state: Appstate) => ({
    fnr: PersonaliaSelector.selectFodselsnummer(state),
    navn: PersonaliaSelector.selectSammensattNavn(state),
    avsenderenhetId: state.enhetId.enhet,

});


const mapDispatchToProps = (dispatch: Dispatch)=> ({
    handleSubmit: (formdata: OppgaveFormData) => dispatch(lagreOppgave(formdata)),
    lukkModal: () => dispatch(navigerAction(null)),
    tilbakeTilProcesser: () => dispatch(navigerAction('prosesser'))
});


export default connect<StateProps, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(OpprettOppgave);