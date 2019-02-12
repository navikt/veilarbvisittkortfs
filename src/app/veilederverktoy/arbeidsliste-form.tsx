import React from 'react';
import { Formik } from 'formik';
import { Input, Textarea } from 'nav-frontend-skjema';
import * as Yup from 'yup';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import {Arbeidsliste} from "../../types/arbeidsliste";
import Modal from "../components/modal/modal";

interface LeggTilArbeidslisteProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleSubmit?: () => void;
    arbeidsliste:Arbeidsliste;
}

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
    return (
        <Formik
            initialValues={{
                overskrift: props.arbeidsliste.overskrift ? props.arbeidsliste.overskrift :  '',
                kommentar: props.arbeidsliste.kommentar? props.arbeidsliste.kommentar : '' }}
            onSubmit={(values, actions) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }, 1000);
            }}
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
                        innholdstittel="Legg til i arbeidsliste"
                    >
                        <form onSubmit={props.handleSubmit}>
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

                            <Hovedknapp htmlType="submit">Lagre</Hovedknapp>
                            <Knapp> Avbryt </Knapp>

                        </form>
                    </Modal>
                ); }}
        />
    );
}

export default ArbeidslisteForm;