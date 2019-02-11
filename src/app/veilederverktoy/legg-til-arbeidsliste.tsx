import React from 'react';
import { Formik } from 'formik';
import NavFrontendModal from 'nav-frontend-modal';
import { Input, Textarea } from 'nav-frontend-skjema';
import * as Yup from 'yup';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';

interface LeggTilArbeidslisteProps {
    isOpen: boolean;
    onCloseModalClick: () => void;
    handleSubmit?: () => void;
}

/*
interface ArbeidslisteData {
    arbeidslisteAktiv: null
    endringstidspunkt: null
    frist: null
    harVeilederTilgang: true
    isOppfolgendeVeileder: true
    kommentar: null
    overskrift: null
    sistEndretAv: null
}
*/

const SignupSchema = Yup.object().shape({
    overskrift: Yup.string()
        .min(1, 'Før kort')
        .max(20, 'Too Long!')
        .required('Pakrevd'),
    kommentar: Yup.string()
        .min(1, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Pakrevd'),
});

function LeggTilArbeidsliste (props: LeggTilArbeidslisteProps) {
    return (
        <NavFrontendModal
            isOpen={props.isOpen}
            contentLabel="modal resultat"
            onRequestClose={props.onCloseModalClick}
            className="modal__arbeidsliste"
            closeButton={true}
        >
            <Formik
                initialValues={{ overskrift: '', kommentar: '' }}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
                validationSchema={SignupSchema}
                render={formikProps => {
                    const harFeilIOverskrift = formikProps.errors.overskrift && formikProps.touched.overskrift ?
                        {feilmelding: formikProps.errors.overskrift} : undefined;
                    const harFeilIKommentar =  formikProps.errors.kommentar && formikProps.touched.kommentar ?
                        {feilmelding: formikProps.errors.kommentar} : undefined;
                    return (<form onSubmit={props.handleSubmit}>
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
                    ); }}
            />
        </NavFrontendModal>
    );
}

export default LeggTilArbeidsliste;