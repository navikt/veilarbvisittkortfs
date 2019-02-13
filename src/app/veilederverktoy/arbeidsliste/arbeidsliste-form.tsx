import React, {useContext} from 'react';
import { Formik } from 'formik';
import { Input, Textarea } from 'nav-frontend-skjema';
import * as Yup from 'yup';
import { Hovedknapp, Knapp } from 'nav-frontend-knapper';
import {Arbeidsliste} from "../../../types/arbeidsliste";
import Modal from "../../components/modal/modal";
import {InitialDataContext} from "../../components/initialdataprovider";
import {postAsJson} from "../../api/api-utils";

interface LeggTilArbeidslisteProps {
    isOpen: boolean;
    onRequestClose: () => void;
    handleSubmit?: () => void;
    arbeidsliste:Arbeidsliste;
    innholdstittel: string;
}

interface ArbeidslisteForm {
    kommentar: string;
    overskrift:string;
    frist?: string;
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

    const {personalia} = useContext(InitialDataContext);

    const initalValues = {
        overskrift: props.arbeidsliste.overskrift ? props.arbeidsliste.overskrift :  '',
        kommentar: props.arbeidsliste.kommentar? props.arbeidsliste.kommentar : '' };

    const lagreArbeidsliste = (fnr: string, arbeidsliste:ArbeidslisteForm) => {
        return postAsJson(`/veilarbportefolje/api/arbeidsliste/${fnr}?fnr=${fnr}`,arbeidsliste
        );
    };

    return (
        <Formik
            initialValues={initalValues}
            onSubmit={(values) => {lagreArbeidsliste(personalia.fodselsnummer, values)}}
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
                        innholdstittel={props.innholdstittel}
                        undertittel={`${personalia.fornavn} ${personalia.etternavn}, ${personalia.fodselsnummer}`}

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
                            <Knapp onClick={props.onRequestClose}> Avbryt </Knapp>

                        </form>
                    </Modal>
                ); }}
        />
    );
}

export default ArbeidslisteForm;