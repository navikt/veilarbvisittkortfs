import { Heading } from '@navikt/ds-react';
import { HuskelappInformasjonsmelding } from '../huskelapp-informasjonsmelding';
import { Form } from 'formik';
import HuskelappForm from './huskelapp-form';
import { HuskelappFooter } from '../huskelapp-footer';
import React from 'react';

interface HuskelappMedArbeidslisteFormProps {
    onRequestClose: () => void;
    visManglerFristOgKommentarHuskelapp: boolean;
}

export const HuskelappEditForm = (formValues: HuskelappMedArbeidslisteFormProps) => (
    <>
        <Heading size="medium" visuallyHidden={true}>
            Huskelappinnhold
        </Heading>
        <HuskelappInformasjonsmelding />
        <Form id="huskelapp-form">
            <HuskelappForm visManglerFristOgKommentarHuskelapp={formValues.visManglerFristOgKommentarHuskelapp} />
        </Form>
        <HuskelappFooter typePrimaryBtn="submit" textPrimaryBtn="Lagre" onRequestClose={formValues.onRequestClose} />
    </>
);
