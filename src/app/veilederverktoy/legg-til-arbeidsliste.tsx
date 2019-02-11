import React from 'react';
import { Formik } from 'formik';
import NavFrontendModal from 'nav-frontend-modal';
import {Input, Textarea} from "nav-frontend-skjema";
import * as Yup from 'yup';
import {Hovedknapp, Knapp} from "nav-frontend-knapper";

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

function LeggTilArbeidsliste (props: LeggTilArbeidslisteProps){
    return (
        <NavFrontendModal
            isOpen={props.isOpen}
            contentLabel="modal resultat"
            onRequestClose={props.onCloseModalClick}
            className="modal__arbeidsliste"
            closeButton
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
                render={props => {
                    const harFeilIOverskrift = props.errors.overskrift && props.touched.overskrift ?
                        {feilmelding: props.errors.overskrift} : undefined;
                    const harFeilIKommentar =  props.errors.kommentar && props.touched.kommentar ?
                        {feilmelding: props.errors.kommentar} : undefined;
                    return (<form onSubmit={props.handleSubmit}>
                            <Input
                                label="Overskrift"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.overskrift}
                                name="overskrift"
                                feil={harFeilIOverskrift}
                            />
                            <Textarea
                                label="Kommentar"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.kommentar}
                                name="kommentar"
                                feil={harFeilIKommentar}
                            />

                            <Hovedknapp htmlType="submit">Lagre</Hovedknapp>
                            <Knapp> Avbryt </Knapp>

                        </form>
                    )}}
            />
        </NavFrontendModal>
    );
}

export default LeggTilArbeidsliste;