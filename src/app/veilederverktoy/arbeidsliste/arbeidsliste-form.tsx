import React from 'react';
import {Formik, FormikValues} from 'formik';
import { Input, Textarea } from 'nav-frontend-skjema';
import * as Yup from 'yup';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import {Arbeidsliste} from "../../../types/arbeidsliste";
import Modal from "../../components/modal/modal";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {oppdaterArbeidsliste} from "../../../store/arbeidsliste/actions";
import ModalContainer from '../../components/modal/modal-container';
import ModalHeader from '../../components/modal/modal-header';
import ModalFooter from '../../components/modal/modal-footer';
import './arbeidsliste.less';

interface OwnProps {
    isOpen: boolean;
    onRequestClose: () => void;
    arbeidsliste:Arbeidsliste;
    innholdstittel: string;
    children: React.ReactNode;
}

interface DispatchProps {
    lagreArbeidsliste: (values: FormikValues)=> void;
}

export interface ArbeidslisteForm {
    kommentar: string;
    overskrift:string;
    frist?: string;
}

type LeggTilArbeidslisteProps = DispatchProps & OwnProps;


const ArbeidslisteSchema = Yup.object().shape({
    overskrift: Yup.string()
        .min(1, 'Før kort')
        .max(20, 'Too Long!')
        .required('Pakrevd'),
    kommentar: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Pakrevd'),
});

function ArbeidslisteForm (props: LeggTilArbeidslisteProps) {
    const initalValues = {
        overskrift: props.arbeidsliste.overskrift ? props.arbeidsliste.overskrift :  '',
        kommentar: props.arbeidsliste.kommentar? props.arbeidsliste.kommentar : '' };
    return (
        <Formik
            initialValues={initalValues}
            onSubmit={props.lagreArbeidsliste}
            validationSchema={ArbeidslisteSchema}
            render={formikProps => {

                const harFeilIOverskrift = formikProps.errors.overskrift && formikProps.touched.overskrift ?
                    {feilmelding: formikProps.errors.overskrift} : undefined;

                const harFeilIKommentar =  formikProps.errors.kommentar && formikProps.touched.kommentar ?
                    {feilmelding: formikProps.errors.kommentar} : undefined;

                return (
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={props.onRequestClose}
                        className=''
                        header={<ModalHeader/>}
                    >
                        <section className="arbeidsliste__form">
                            <ModalContainer className="arbeidsliste__form-container">
                                {props.children}
                                <form onSubmit={formikProps.handleSubmit}>
                                    <Input
                                        label="Overskrift"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.overskrift}
                                        name="overskrift"
                                        feil={harFeilIOverskrift}
                                    />
                                    <Textarea
                                        label="Kommentar"
                                        onChange={formikProps.handleChange}
                                        onBlur={formikProps.handleBlur}
                                        value={formikProps.values.kommentar}
                                        name="kommentar"
                                        feil={harFeilIKommentar}
                                    />
                                    <ModalFooter>
                                        <Hovedknapp htmlType="submit">Lagre</Hovedknapp>
                                        <Knapp htmlType="button" onClick={props.onRequestClose}> Avbryt </Knapp>
                                    </ModalFooter>
                                </form>
                            </ModalContainer>
                        </section>
                    </Modal>
                ); }}
        />
    );
}

const mapDispatchToProps= (dispatch : Dispatch) =>({
    lagreArbeidsliste: (values: FormikValues)=> dispatch(
        oppdaterArbeidsliste({kommentar: values.kommentar, overskrift: values.overskrift})
    )
});

export default connect<{},DispatchProps, OwnProps>(null, mapDispatchToProps)(ArbeidslisteForm);